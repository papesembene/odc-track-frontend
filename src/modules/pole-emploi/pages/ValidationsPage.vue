<script setup lang="ts">
import { ref } from 'vue'
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'
import ValidationCard from '@/modules/pole-emploi/components/ValidationCard.vue'

const items = ref([
  {
    id: 1,
    name: 'Cheikh Gueye',
    status: 'En attente',
    type: 'Alternance',
    entreprise: '',
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

const promotionFilter  = ref('')
const referentielFilter = ref('')
const typeFilter       = ref('')
const sortFilter       = ref('')

const handleReject   = (id: number) => console.log('Reject', id)
const handleValidate = (id: number) => console.log('Validate', id)
</script>

<template>
  <BackofficeLayout title="Validations des situations" active-menu="validations">
    <div class="space-y-5">

      <!-- ── Filters ── -->
      <section class="rounded-xl border border-slate-200 bg-white px-6 py-5">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <!-- Promotion -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Promotion</label>
            <div class="relative">
              <select
                v-model="promotionFilter"
                class="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value=""></option>
                <option value="promo-2023">Promo 2023</option>
                <option value="promo-2024">Promo 2024</option>
              </select>
              <svg class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          <!-- Référentiel -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Référentiel</label>
            <div class="relative">
              <select
                v-model="referentielFilter"
                class="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value=""></option>
                <option value="cybersecurite">Cybersécurité</option>
                <option value="data-science">Data Science</option>
                <option value="dev-web">Développement Web</option>
              </select>
              <svg class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          <!-- Type -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Type</label>
            <div class="relative">
              <select
                v-model="typeFilter"
                class="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value=""></option>
                <option value="alternance">Alternance</option>
                <option value="stage">Stage</option>
                <option value="emploi">Emploi</option>
              </select>
              <svg class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          <!-- Trier par -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Trier par</label>
            <div class="relative">
              <select
                v-model="sortFilter"
                class="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value=""></option>
                <option value="date-asc">Date croissante</option>
                <option value="date-desc">Date décroissante</option>
                <option value="name">Nom</option>
              </select>
              <svg class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Card list ── -->
      <section class="rounded-xl border border-slate-200 bg-white">

        <!-- List header -->
        <div class="border-b border-slate-200 px-6 py-4 lg:px-8">
          <h2 class="text-lg font-semibold text-slate-900">{{ items.length }} situations en attente</h2>
        </div>

        <!-- Cards -->
        <ValidationCard
          v-for="item in items"
          :key="item.id"
          v-bind="item"
          @reject="handleReject(item.id)"
          @validate="handleValidate(item.id)"
        />

      </section>
    </div>
  </BackofficeLayout>
</template>
