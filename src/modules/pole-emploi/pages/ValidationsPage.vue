<script setup lang="ts">
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'

const items = [
  {
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
]
</script>

<template>
  <BackofficeLayout title="Validations des situations" active-menu="validations">
    <div class="space-y-6">
      <section class="rounded-2xl border border-slate-200 bg-white p-5 lg:p-7">
        <div class="grid gap-4 lg:grid-cols-4">
          <div>
            <label class="mb-2 block text-2xl font-medium text-slate-700">Promotion</label>
            <select class="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-xl text-slate-600 outline-none"><option value=""> </option></select>
          </div>
          <div>
            <label class="mb-2 block text-2xl font-medium text-slate-700">Référentiel</label>
            <select class="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-xl text-slate-600 outline-none"><option value=""> </option></select>
          </div>
          <div>
            <label class="mb-2 block text-2xl font-medium text-slate-700">Type</label>
            <select class="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-xl text-slate-600 outline-none"><option value=""> </option></select>
          </div>
          <div>
            <label class="mb-2 block text-2xl font-medium text-slate-700">Trier par</label>
            <select class="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-xl text-slate-600 outline-none"><option value=""> </option></select>
          </div>
        </div>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white">
        <div class="border-b border-slate-200 px-5 py-5 lg:px-7">
          <h2 class="text-4xl font-semibold text-slate-900">3 situations en attente</h2>
        </div>

        <article v-for="(item, index) in items" :key="`${item.name}-${index}`" class="border-b border-slate-200 px-5 py-6 last:border-b-0 lg:px-7">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <h3 class="text-4xl font-semibold text-slate-900">{{ item.name }}</h3>
              <span class="rounded-full bg-amber-100 px-3 py-1 text-xl text-amber-700">{{ item.status }}</span>
            </div>
            <div class="flex gap-2">
              <button class="rounded-xl border-2 border-orange-500 px-4 py-2 text-2xl font-medium text-orange-500 hover:bg-orange-50">✕ Rejeter</button>
              <button class="rounded-xl bg-orange-500 px-4 py-2 text-2xl font-medium text-white hover:bg-orange-600">✓ Valider</button>
            </div>
          </div>

          <div class="mt-5 grid gap-5 lg:grid-cols-2">
            <div><p class="text-2xl text-slate-500">Type</p><p class="mt-1 text-4xl text-slate-900">{{ item.type }}</p></div>
            <div><p class="text-2xl text-slate-500">Entreprise</p><p class="mt-1 text-4xl text-slate-900">{{ item.entreprise }}</p></div>
            <div><p class="text-2xl text-slate-500">Promotion</p><p class="mt-1 text-4xl text-slate-900">{{ item.promotion }}</p></div>
            <div><p class="text-2xl text-slate-500">Référentiel</p><p class="mt-1 text-4xl text-slate-900">{{ item.referentiel }}</p></div>
          </div>

          <div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-2xl text-slate-500">
            <span>🗓 Début: {{ item.debut }}</span>
            <span>🗓 Fin: {{ item.fin }}</span>
            <span>◷ Créée le {{ item.createdAt }}</span>
          </div>
        </article>
      </section>
    </div>
  </BackofficeLayout>
</template>
