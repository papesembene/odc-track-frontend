<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'
import { getStatistiques, type StatistiquesGlobales } from '@/modules/manager/api/statistiques.api'
import { getActivePromotion } from '@/modules/manager/api/promotions.api'

// ── Data from API ──
const statsData = ref<StatistiquesGlobales | null>(null)
const activePromotion = ref<{ nom: string; annee: number } | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// ── Fetch data on mount ──
onMounted(async () => {
  try {
    const [stats, activePromo] = await Promise.all([
      getStatistiques({
        includePromotions: true,
        includeReferentiels: false,
        includeSituationsRecentes: true,
      }),
      getActivePromotion()
    ])
    statsData.value = stats
    activePromotion.value = activePromo
  } catch (e: any) {
    error.value = e.message || 'Erreur lors du chargement des données'
    console.error('Erreur:', e)
  } finally {
    loading.value = false
  }
})

// ── Computed stats for cards ──
const stats = computed(() => {
  if (!statsData.value) {
    return [
      { label: 'Total Apprenants', value: '-', badge: '', badgeClass: 'bg-slate-100 text-slate-500', iconBg: 'bg-orange-50', iconColor: 'text-orange-400', icon: 'graduation' },
      { label: 'Coaches actifs', value: '-', badge: '', badgeClass: 'bg-slate-100 text-slate-500', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', icon: 'coach' },
      { label: 'Situations validées', value: '-', badge: '', badgeClass: 'bg-slate-100 text-slate-500', iconBg: 'bg-blue-50', iconColor: 'text-blue-400', icon: 'check' },
      { label: "Taux d'insertion", value: '-', badge: '', badgeClass: 'bg-slate-100 text-slate-500', iconBg: 'bg-amber-50', iconColor: 'text-amber-400', icon: 'trend' },
    ]
  }
  
  const { totalApprenants, validees, tauxInsertion } = statsData.value
  
  return [
    {
      label: 'Total Apprenants',
      value: String(totalApprenants),
      badge: '',
      badgeClass: 'bg-slate-100 text-slate-500',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-400',
      icon: 'graduation',
    },
    {
      label: 'Promotion active',
      value: activePromotion.value ? '1' : '0',
      badge: '',
      badgeClass: 'bg-slate-100 text-slate-500',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      icon: 'coach',
    },
    {
      label: 'Situations validées',
      value: String(validees),
      badge: '',
      badgeClass: 'bg-slate-100 text-slate-500',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-400',
      icon: 'check',
    },
    {
      label: "Taux d'insertion",
      value: `${tauxInsertion}%`,
      badge: '',
      badgeClass: 'bg-slate-100 text-slate-500',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-400',
      icon: 'trend',
    },
  ]
})

// ── Computed alerts from data ──
const alerts = computed(() => {
  const result = []
  
  if (statsData.value?.enAttente && statsData.value.enAttente > 0) {
    result.push({
      type: 'warning',
      bg: 'bg-amber-50',
      iconColor: 'text-amber-400',
      text: `${statsData.value.enAttente} situation${statsData.value.enAttente > 1 ? 's' : ''} en attente de validation`,
    })
  }
  
  if (statsData.value?.parStatut) {
    const enRecherche = statsData.value.parStatut.RECHERCHE_EMPLOI || 0
    if (enRecherche > 0) {
      result.push({
        type: 'info',
        bg: 'bg-blue-50',
        iconColor: 'text-blue-400',
        text: `${enRecherche} apprenant${enRecherche > 1 ? 's' : ''} en recherche d'emploi`,
      })
    }
  }
  
  if (statsData.value?.tauxInsertion && statsData.value.tauxInsertion >= 75) {
    result.push({
      type: 'success',
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      text: `Taux d'insertion de ${statsData.value.tauxInsertion}% atteint`,
    })
  }
  
  return result
})

// ── Computed activities from situations recentes ──
const activities = computed(() => {
  if (!statsData.value?.situationsRecentes) return []
  
  return statsData.value.situationsRecentes.map((sit, idx) => {
    const apprenant = sit.apprenant?.user
    const nomComplet = apprenant ? `${apprenant.prenom} ${apprenant.nom}` : 'Apprenant'
    
    let action = ''
    let icon = 'briefcase'
    let iconBg = 'bg-orange-100'
    let iconColor = 'text-orange-500'
    let tag = ''
    let tagClass = 'bg-orange-100 text-orange-600'
    
    switch (sit.statut) {
      case 'EN_EMPLOI':
        action = 'Nouvelle situation déclarée'
        tag = 'Emploi'
        break
      case 'EN_STAGE':
        action = 'Nouvelle situation déclarée'
        tag = 'Stage'
        tagClass = 'bg-blue-100 text-blue-600'
        break
      case 'RECHERCHE_EMPLOI':
        action = 'En recherche d\'emploi'
        tag = 'Recherche'
        tagClass = 'bg-amber-100 text-amber-600'
        break
      default:
        action = 'Situation mise à jour'
    }
    
    if (sit.valide) {
      action = 'Situation validée'
      tag = 'Validé'
      tagClass = 'bg-emerald-100 text-emerald-600'
      iconBg = 'bg-emerald-100'
      iconColor = 'text-emerald-500'
      icon = 'check'
    }
    
    return {
      id: sit.id || idx,
      name: nomComplet,
      action,
      tag,
      tagClass,
      time: formatTimeAgo(sit.createdAt),
      iconBg,
      iconColor,
      icon,
    }
  })
})

// ── Helpers ──
function formatTimeAgo(dateStr: string): string {
  if (!dateStr) return 'Récent'
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 60) return `Il y a ${diffMins} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return date.toLocaleDateString('fr-FR')
}

// ── Computed promotions from data ──
const promotions = computed(() => {
  if (!statsData.value?.parPromotion) return []
  
  return statsData.value.parPromotion.map(p => {
    const taux = p.total > 0 ? Math.round((p.enEmploi / p.total) * 100) : 0
    const isActivePromotion = activePromotion.value?.nom === p.promotionNom
    const statusClass = isActivePromotion
      ? 'border-emerald-400 text-emerald-600 bg-emerald-50'
      : 'border-slate-200 text-slate-500 bg-slate-50'
    
    return {
      name: p.promotionNom,
      status: isActivePromotion ? 'Active' : 'Suivi',
      statusClass,
      apprenants: p.total,
      taux,
      hasTaux: p.total > 0,
    }
  })
})
</script>

<template>
  <ManagerLayout title="Tableau de bord Manager" active-menu="dashboard">
    <div class="space-y-5">
      <!-- Loading state -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <span class="ml-3 text-slate-500">Chargement des statistiques...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-red-600">
        {{ error }}
      </div>

      <template v-else>
        <!-- ── Active Promotion Banner ── -->
        <div v-if="activePromotion" class="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div>
                <p class="text-sm text-white/80">Promotion active</p>
                <p class="text-lg font-bold">{{ activePromotion.nom }} ({{ activePromotion.annee }})</p>
              </div>
            </div>
            <div class="text-sm text-white/80">
              Données filtrées automatiquement
            </div>
          </div>
        </div>

        <div v-else class="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-700">
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <p>Aucune promotion active. Veuillez activer une promotion depuis la page Promotions.</p>
          </div>
        </div>

        <!-- ── Stat cards ── -->
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex items-start justify-between">
              <div :class="['flex h-11 w-11 items-center justify-center rounded-xl', stat.iconBg]">
                <!-- graduation cap -->
                <svg v-if="stat.icon === 'graduation'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                <!-- coach icon -->
                <svg v-else-if="stat.icon === 'coach'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                <!-- check circle -->
                <svg v-else-if="stat.icon === 'check'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <polyline points="9 12 11.5 14.5 15.5 10"/>
                </svg>
                <!-- trend chart -->
                <svg v-else :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="4 4 4 20 20 20"/>
                  <polyline points="7 14 11 10 14 13 19 7"/>
                </svg>
              </div>
              <span :class="['rounded-full px-2.5 py-0.5 text-xs font-medium', stat.badgeClass]">{{ stat.badge }}</span>
            </div>
            <p class="mt-4 text-3xl font-bold text-slate-900">{{ stat.value }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ stat.label }}</p>
          </article>
        </div>

        <!-- ── Alert banners ── -->
        <div v-if="alerts.length > 0" class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="alert in alerts"
            :key="alert.text"
            :class="['rounded-2xl p-4', alert.bg]"
          >
            <div class="flex items-start gap-3">
              <!-- warning -->
              <svg v-if="alert.type === 'warning'" :class="['mt-0.5 h-5 w-5 shrink-0', alert.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <!-- info -->
              <svg v-else-if="alert.type === 'info'" :class="['mt-0.5 h-5 w-5 shrink-0', alert.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <!-- success check -->
              <svg v-else :class="['mt-0.5 h-5 w-5 shrink-0', alert.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <polyline points="9 12 11.5 14.5 15.5 10"/>
              </svg>
              <p class="text-sm text-slate-700 font-medium leading-snug">{{ alert.text }}</p>
            </div>
            <button class="mt-3 text-sm font-semibold text-orange-500 hover:underline">Voir le détail →</button>
          </div>
        </div>

        <!-- ── Activité récente ── -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center justify-between px-6 py-4">
              <h2 class="text-base font-bold text-slate-900">Activité récente</h2>
              <button class="text-sm font-semibold text-orange-500 hover:underline">Voir tout</button>
            </div>
            <div class="divide-y divide-slate-100 px-6">
              <article v-for="item in activities" :key="item.id" class="flex items-start gap-4 py-4">
                <div :class="['flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', item.iconBg]">
                  <!-- briefcase -->
                  <svg v-if="item.icon === 'briefcase'" :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                  <!-- document -->
                  <svg v-else-if="item.icon === 'document'" :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <!-- check -->
                  <svg v-else-if="item.icon === 'check'" :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <polyline points="9 12 11.5 14.5 15.5 10"/>
                  </svg>
                  <!-- person -->
                  <svg v-else :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-sm font-semibold text-slate-900">{{ item.name }}</span>
                    <span class="text-sm text-slate-500">— {{ item.action }}</span>
                    <span
                      v-if="item.tag"
                      :class="['rounded-full px-2.5 py-0.5 text-xs font-semibold', item.tagClass]"
                    >{{ item.tag }}</span>
                  </div>
                  <p class="mt-0.5 text-xs text-slate-400">{{ item.time }}</p>
                </div>
              </article>
              
              <!-- Empty state -->
              <div v-if="activities.length === 0" class="py-8 text-center text-slate-400">
                <p class="text-sm">Aucune activité récente</p>
              </div>
            </div>
        </div>

        <!-- ── Promotions en cours ── -->
        <div v-if="promotions.length > 0" class="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 class="text-base font-bold text-slate-900">Promotions</h2>
            <button class="text-sm font-semibold text-orange-500 hover:underline">Voir les stats</button>
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-3">
            <div
              v-for="promo in promotions"
              :key="promo.name"
              class="rounded-xl border border-slate-200 p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm font-bold text-slate-900">{{ promo.name }}</p>
                <span :class="['rounded-full border px-2.5 py-0.5 text-xs font-medium', promo.statusClass]">
                  {{ promo.status }}
                </span>
              </div>
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-slate-500">Apprenants</span>
                <span class="font-semibold text-slate-900">{{ promo.apprenants }}</span>
              </div>
              <template v-if="promo.hasTaux">
                <div class="flex items-center justify-between text-sm mt-2 mb-2">
                  <span class="text-slate-500">Taux d'insertion</span>
                  <span class="font-bold text-emerald-600">{{ promo.taux }}%</span>
                </div>
                <div class="h-1.5 rounded-full bg-slate-100">
                  <div
                    class="h-1.5 rounded-full bg-orange-500 transition-all"
                    :style="{ width: promo.taux + '%' }"
                  ></div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>

    </div>
  </ManagerLayout>
</template>
