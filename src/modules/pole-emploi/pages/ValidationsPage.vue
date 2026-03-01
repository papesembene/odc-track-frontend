<script setup lang="ts">
import { ref } from 'vue'
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'

const items = ref([
  {
    id: 1,
    name: 'Cheikh Gueye',
    status: 'En attente',
    type: 'Alternance',
    entreprise: '-',
    promotion: 'Promo 2023',
    referentiel: 'Cybersécurité',
    debut: '01/03/2024',
    fin: '31/08/2024',
    createdAt: 'Invalid Date',
  },
  {
    id: 2,
    name: 'Khady Cisse',
    status: 'En attente',
    type: 'Stage',
    entreprise: 'AI Analytics Group',
    promotion: 'Promo 2024',
    referentiel: 'Data Science',
    debut: '10/03/2024',
    fin: '10/06/2024',
    createdAt: 'Invalid Date',
  },
  {
    id: 3,
    name: 'Moussa Ba',
    status: 'En attente',
    type: 'Emploi',
    entreprise: 'WebCorp Sénégal',
    promotion: 'Promo 2024',
    referentiel: 'Développement Web',
    debut: '15/01/2024',
    fin: '15/06/2024',
    createdAt: 'Invalid Date',
  },
])
</script>

<template>
  <BackofficeLayout title="Validations des situations" active-menu="validations">
    <div class="space-y-5">
      <section class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="grid gap-4 lg:grid-cols-4">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Promotion</label>
            <select class="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none">
              <option value=""> </option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Référentiel</label>
            <select class="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none">
              <option value=""> </option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Type</label>
            <select class="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none">
              <option value=""> </option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Trier par</label>
            <select class="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none">
              <option value=""> </option>
            </select>
          </div>
        </div>
      </section>

      <section class="rounded-xl border border-slate-200 bg-white">
        <div class="border-b border-slate-200 px-6 py-4">
          <h2 class="text-3xl font-bold text-slate-900">{{ items.length }} situations en attente</h2>
        </div>

        <article
          v-for="item in items"
          :key="item.id"
          class="border-b border-slate-200 px-6 py-5 last:border-b-0"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex items-center gap-2.5">
              <h3 class="text-2xl font-bold text-slate-900">{{ item.name }}</h3>
              <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">{{ item.status }}</span>
            </div>
            <div class="flex gap-2">
              <button class="rounded-xl border-2 border-orange-500 px-4 py-2 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-50">✕ Rejeter</button>
              <button class="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600">✓ Valider</button>
            </div>
          </div>

          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p class="text-sm text-slate-500">Type</p>
              <p class="text-3xl font-medium text-slate-900">{{ item.type }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-500">Entreprise</p>
              <p class="text-3xl font-medium text-slate-900">{{ item.entreprise }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-500">Promotion</p>
              <p class="text-3xl font-medium text-slate-900">{{ item.promotion }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-500">Référentiel</p>
              <p class="text-3xl font-medium text-slate-900">{{ item.referentiel }}</p>
            </div>
          </div>

          <div class="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
            <span>🗓 Début: {{ item.debut }}</span>
            <span>🗓 Fin: {{ item.fin }}</span>
            <span>◷ Créée le {{ item.createdAt }}</span>
          </div>
        </article>
      </section>
    </div>
  </BackofficeLayout>
</template>
