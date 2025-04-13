<template>
  <main class="container">
    <h1>Escape from Tarkov Ammo Comparison</h1>
    <hr />

    <div class="search-wrapper">
      <input v-model="searchQuery" type="text" placeholder="Search name, short name, or caliber..."
        class="search-box" />
    </div>

    <AmmoChart v-if="sortedAmmo.length" :ammoData="sortedAmmo" />

    <table v-if="sortedAmmo.length">
      <thead>
        <tr>
          <th @click="sortBy('item.name')">Name</th>
          <th @click="sortBy('caliber')">Caliber</th>
          <th @click="sortBy('ammoType')">Type</th>
          <th @click="sortBy('damage')">Damage</th>
          <th @click="sortBy('penetrationPower')">Pen</th>
          <th @click="sortBy('armorDamage')">Armor %</th>
          <th @click="sortBy('fragmentationChance')">Frag %</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="round in sortedAmmo" :key="round.item.id">
          <td>{{ round.item.name }}</td>
          <td>{{ round.caliber }}</td>
          <td>{{ round.ammoType }}</td>
          <td>{{ round.damage }}</td>
          <td>{{ round.penetrationPower }}</td>
          <td>{{ round.armorDamage }}%</td>
          <td>{{ Math.round(round.fragmentationChance * 100) }}%</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Loading...</p>
  </main>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import { gql } from '@apollo/client/core';
import apolloClient from '../apollo';
import AmmoChart from './AmmoChart.vue';


const ammo = ref([]);
const sortKey = ref('damage');
const sortAsc = ref(false);
const searchQuery = ref('');
const debouncedQuery = ref('');

// Debounce logic
let timeout = null;
watch(searchQuery, (newVal) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    debouncedQuery.value = newVal;
  }, 300); // 300ms debounce
});

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
};

const getValue = (obj, key) => key.split('.').reduce((o, i) => o?.[i], obj);

const sortedAmmo = computed(() => {
  const search = debouncedQuery.value.toLowerCase();
  const filtered = ammo.value.filter((round) => {
    const name = round.item.name?.toLowerCase() || '';
    const shortName = round.item.shortName?.toLowerCase() || '';
    const caliber = round.caliber?.toLowerCase() || '';
    return (
      name.includes(search) ||
      shortName.includes(search) ||
      caliber.includes(search)
    );
  });

  return [...filtered].sort((a, b) => {
    const valA = getValue(a, sortKey.value);
    const valB = getValue(b, sortKey.value);
    if (typeof valA === 'string') {
      return sortAsc.value
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortAsc.value ? valA - valB : valB - valA;
    }
  });
});

apolloClient
  .query({
    query: gql`
      query {
        ammo(lang: en) {
          item {
            id
            name
            shortName
          }
          caliber
          ammoType
          penetrationPower
          damage
          armorDamage
          fragmentationChance
        }
      }
    `,
  })
  .then((result) => {
    ammo.value = result.data.ammo;
  });
</script>
