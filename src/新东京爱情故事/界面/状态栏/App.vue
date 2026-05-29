<template>
  <div class="container" :class="{ 'dark-mode': isDarkMode }">
    <input type="radio" name="face" id="f1" checked />
    <input type="radio" name="face" id="f2" />
    <input type="radio" name="face" id="f3" />
    <input type="radio" name="face" id="f4" />
    <input type="radio" name="face" id="f5" />

    <div class="watch-wrapper">
      <div class="watch-container">

        <div class="dir-btn dir-left" @click="goPrev">
          <span class="dir-arrow dir-arrow-left">&#x2039;</span>
          <span class="dir-label">PREV</span>
        </div>
        <div class="dir-btn dir-right" @click="goNext">
          <span class="dir-arrow dir-arrow-right">&#x203A;</span>
          <span class="dir-label">NEXT</span>
        </div>
      <div class="watch-case">
          <div class="crown-well"></div>
          <div class="crown"></div>
          <div class="side-btn-well"></div>
          <div class="side-btn"></div>
          <div class="action-btn-well"></div>
          <div class="action-btn"></div>

          <div ref="displayRef" class="display-unit" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseLeave">
            <div class="status-bar">
              <span>{{ store.data.系统.当前时间 }}</span>
              <span class="battery">100% <span class="bolt">&#x26A1;</span></span>
            </div>

            <div class="view-wrapper" :style="viewTransform">
              <!-- ====== 第1页：时间日期天气 ====== -->
              <div class="view face-ultra">
                <!-- 左上：天气 -->
                <div class="comp comp-top-left weather-box">
                  <svg class="weather-svg" viewBox="0 0 24 24" v-html="weatherSvgPath"></svg>
                  <span class="weather-text">{{ weatherLabel }}</span>
                </div>

                <!-- 右上：日夜切换 -->
                <div class="comp comp-top-right comp-toggle">
                  <label class="switch">
                    <span class="sun">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g fill="#ffd43b"><circle r="5" cy="12" cx="12"/><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"/></g>
                      </svg>
                    </span>
                    <span class="moon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
                      </svg>
                    </span>
                    <input type="checkbox" class="input" v-model="isDarkMode" />
                    <span class="slider"></span>
                  </label>
                  <span class="toggle-text">{{ isDarkMode ? '夜间模式' : '日间模式' }}</span>
                </div>

                <div class="main-time">
                  <div class="h2">{{ store.data.系统.当前时间 }}</div>
                  <span>{{ store.data.系统.当前日期 }}</span>
                </div>

                <div class="comp comp-bottom">
                  <div style="display:flex;flex-direction:column;justify-content:center;">
                    <span class="comp-label-sm">LOCATION</span>
                    <span class="comp-val">{{ store.data.系统.当前地点 }}</span>
                  </div>
                </div>
              </div>

              <!-- ====== 第2页：穿搭 ====== -->
              <div class="view face-outfit">
                <!-- 角色切换导航 -->
                <div class="wardrobe-nav">
                  <button class="char-btn" :class="{ active: outfitChar === 'erii' }" @click="outfitChar = 'erii'">
                    <svg class="char-icon-f" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="8" r="4"/><path d="M5 20v-2a4 4 0 014-4h6a4 4 0 014 4v2"/>
                    </svg>
                    <span>绘梨衣</span>
                  </button>
                  <button class="char-btn" :class="{ active: outfitChar === 'lmf' }" @click="outfitChar = 'lmf'">
                    <svg class="char-icon-m" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="8" r="4"/><path d="M5 20v-2a4 4 0 014-4h6a4 4 0 014 4v2"/>
                    </svg>
                    <span>路明非</span>
                  </button>
                </div>

                <!-- 衣柜卡片 -->
                <div class="wardrobe-list">
                  <div v-for="slot in currentSlots" :key="slot" class="wardrobe-card">
                    <div class="wc-icon" v-html="getSlotIcon(slot)"></div>
                    <div class="wc-info">
                      <span class="wc-slot">{{ slot }}</span>
                      <span class="wc-desc" :class="{ 'wc-empty': !getCurrentWear(slot) || getCurrentWear(slot) === '无' }">
                        {{ getCurrentWear(slot) || '--' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ====== 第3页：持有物 ====== -->
              <div class="view face-items">
                <!-- 绘梨衣 -->
                <div class="items-col">
                  <div class="items-col-title">绘梨衣</div>
                  <div class="items-grid">
                    <div
                      v-for="(desc, name) in eriiItems" :key="name"
                      class="item-card"
                      @click="openItem('绘梨衣', name, desc)"
                    >{{ name }}</div>
                    <div v-if="_.isEmpty(eriiItems)" class="item-empty">暂无物品</div>
                  </div>
                </div>
                <!-- 路明非 -->
                <div class="items-col">
                  <div class="items-col-title">路明非</div>
                  <div class="items-grid">
                    <div
                      v-for="(desc, name) in lmfItems" :key="name"
                      class="item-card"
                      @click="openItem('路明非', name, desc)"
                    >{{ name }}</div>
                    <div v-if="_.isEmpty(lmfItems)" class="item-empty">暂无物品</div>
                  </div>
                </div>

                <!-- 物品详情弹窗 -->
                <Teleport to="body">
                  <Transition name="modal-fade">
                    <div v-if="selectedItem" class="item-modal-overlay" @click.self="selectedItem = null">
                      <div class="item-modal">
                        <div class="item-modal-owner">{{ selectedItem.owner }}</div>
                        <div class="item-modal-name">{{ selectedItem.name }}</div>
                        <div class="item-modal-divider"></div>
                        <div class="item-modal-desc">{{ selectedItem.desc || '暂无详细描述' }}</div>
                        <button class="item-modal-close" @click="selectedItem = null">关闭</button>
                      </div>
                    </div>
                  </Transition>
                </Teleport>
              </div>

              <!-- ====== 第4页：好感度 ====== -->
              <div class="view hr-view">
                <svg class="heart-svg" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <p class="favor-num">
                  {{ store.data.绘梨衣.好感度 }}
                </p>
                <span class="favor-label">好感度</span>
              </div>

              <!-- ====== 第5页：地图 ====== -->
              <div class="view face-map">
                <LocationMap :location="store.data.系统.当前地点" :weather="store.data.系统.天气" :is-dark-mode="isDarkMode" />
              </div>
            </div>

            <div class="nav">
              <label class="dot d1" @click.prevent="currentPage = 1"></label>
              <label class="dot d2" @click.prevent="currentPage = 2"></label>
              <label class="dot d3" @click.prevent="currentPage = 3"></label>
              <label class="dot d4" @click.prevent="currentPage = 4"></label>
              <label class="dot d5" @click.prevent="currentPage = 5"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { useDataStore } from "./store";
import LocationMap from "./components/LocationMap.vue";

const store = useDataStore();

const isDarkMode = ref(false);

const eriiSlots = ["上衣", "下装", "鞋子", "配饰", "内衣"];
const lmfSlots = ["上衣", "下装", "鞋子"];
const outfitChar = ref<"erii" | "lmf">("erii");

const currentSlots = computed(() => outfitChar.value === "erii" ? eriiSlots : lmfSlots);

function getCurrentWear(slot: string) {
  try {
    const key = outfitChar.value === "erii" ? "绘梨衣" : "路明非";
    const wear = (store.data as any)?.[key]?.穿着?.[slot];
    return typeof wear === "string" ? wear : "";
  } catch { return ""; }
}

// 衣柜图标：绘梨衣女性化 / 路明非男性化
const SLOT_ICONS_F: Record<string, string> = {
  "上衣": '<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M662.15936 44.09344a2875.50464 2875.50464 0 0 1 78.70976 18.94912c22.35392 5.34528 40.81664 20.89472 49.5616 41.78944a67.5328 67.5328 0 0 1 5.8368 30.61248c-0.4864 11.17184-3.4048 22.3488-8.26368 32.55296-51.98848 104.46848-70.93248 188.04224-74.82368 305.62816 58.79296 131.19488 118.07744 255.09376 172.0064 363.93984 5.3504 10.19904 7.7824 21.38112 8.26368 32.55296 1.45408 34.49856-21.86752 64.62464-55.39328 72.8832-205.04576 52.47488-446.5408 52.47488-651.59168 0-33.52576-7.77728-56.85248-38.38464-55.38816-72.8832 0.4864-11.17696 3.39968-22.35392 8.25856-32.55296 51.0208-103.00928 107.38688-220.1088 162.77504-343.53152-0.9728-131.67616-25.2672-215.74144-80.17408-326.03648-5.34016-10.20416-7.77216-21.38112-8.25856-32.55296v-7.77728c1.94048-31.58528 24.2944-57.82016 54.90688-64.62464 32.55296-8.25856 61.71136-15.54944 87.94624-20.89472l8.26368 40.33024c45.66528 143.33952 272.09728 121.47712 297.36448-38.38464m78.22336 135.56736c4.85888-9.71776 12.14976-24.2944 12.63104-34.01728 0-4.85888 0-9.71776-0.96256-14.09024-0.9728-2.91328-2.432-5.83168-3.8912-8.74496-7.29088-17.49504-22.3488-17.49504-44.6976-23.3216-5.3504-1.4592-10.69056-2.91328-16.04096-3.88608-54.41536 171.52-308.54144 170.5472-360.53504-3.4048-9.23136 2.432-18.94912 4.85888-29.63968 7.28576-22.3488 5.83168-20.4032 5.83168-34.98496 18.46272-3.4048 2.91328-3.4048 8.74496-3.8912 13.60384-0.48128 2.432-0.96768 4.85888-0.96768 7.29088v7.28576c0.4864 10.20416 2.91328 20.40832 7.77728 29.15328 48.5888 99.1232 70.45632 166.66112 71.424 285.71136h341.58592c0-119.04 12.63616-181.72416 62.19264-281.32864z m96.69632 646.24128c-50.048-101.55008-105.44128-203.10528-159.37536-326.03648H336.60416c-54.41536 122.9312-104.46848 229.34528-154.51648 330.89536-4.37248 9.23648-7.28576 18.94912-7.77728 29.6448v7.28576c0 2.432 0.4864 4.85888 0.9728 7.29088 0.96768 4.85888 0.48128 10.69056 3.88608 13.60384 14.57664 12.63104 12.63616 12.63104 34.98496 18.46272 184.15616 47.1296 401.35168 47.1296 585.50784 0 22.3488-5.8368 37.41696-5.8368 44.70272-23.32672 1.94048-2.91328 3.39456-5.83168 3.88608-8.74496 0.9728-4.85888 1.4592-9.71776 0.9728-14.09536 0.00512-10.19904-7.28576-25.26208-12.14464-34.97984z"/></svg>',
  "下装": '<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M298.666667 277.333333h426.666666v-21.333333a21.333333 21.333333 0 0 0-21.333333-21.333333H320a21.333333 21.333333 0 0 0-21.333333 21.333333v21.333333z m21.333333-85.333333h384a64 64 0 0 1 64 64v64H256v-64a64 64 0 0 1 64-64z" opacity="0.35"/><path d="M688.554667 848.170667a21.76 21.76 0 0 1-0.064-0.341334l-43.882667-222.613333a21.333333 21.333333 0 1 1 41.877333-8.234667l43.861334 222.592v0.106667a1081.856 1081.856 0 0 0 139.413333-41.493333l-147.754667-482.602667a21.333333 21.333333 0 0 1 40.789334-12.501333l153.6 501.674666a21.333333 21.333333 0 0 1-12.629334 26.133334C774.506667 881.386667 644.266667 906.666667 513.216 906.666667c-131.050667 0-262.058667-25.28-392.896-75.733334a21.333333 21.333333 0 0 1-12.714667-26.176l153.6-501.674666a21.333333 21.333333 0 0 1 40.789334 12.501333L154.261333 798.08c41.301333 15.146667 82.56 27.690667 123.818667 37.610667a21.76 21.76 0 0 1 0.064-0.341334l71.573333-337.088a21.333333 21.333333 0 0 1 41.749334 8.853334l-71.594667 337.109333-0.128 0.597333c53.802667 10.666667 107.584 16.853333 161.344 18.624a21.44 21.44 0 0 1-0.362667-3.968v-111.957333a21.333333 21.333333 0 0 1 42.666667 0v111.957333c0 1.536-0.170667 3.008-0.469333 4.458667a982.890667 982.890667 0 0 0 165.632-15.786667z"/></svg>',
  "鞋子": '<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M948.48 208.128c-22.784-22.784-71.68-70.912-98.8672-97.5872a51.9168 51.9168 0 0 0-76.3392 3.9424c-44.032 53.1968-267.3664 322.56-336.2304 403.5584-43.1616 50.7392-87.808 64.768-112.64 61.44-7.3728-0.9728-16.9984-3.9936-20.8896-12.4416a35.84 35.84 0 0 0-39.6288-20.1216c-141.9776 28.672-216.832 92.672-216.5248 185.0368v1.1264c0 87.5008 38.4 181.0432 146.176 181.0432h249.4464c72.0896 0 125.696-53.0432 139.8784-138.24 9.9328-57.9584 36.5568-167.2192 103.0656-239.8208v342.2208a35.84 35.84 0 0 0 35.84 35.84h110.0288a35.84 35.84 0 0 0 35.84-35.84v-255.744c0-69.9904 29.4912-147.456 78.848-207.8208a134.0416 134.0416 0 0 0 30.1056-48.2816c22.5792-62.4128-1.8432-132.0448-28.1088-158.3104zM442.9824 842.2912H193.28c-43.6224 0-62.2592-31.0272-69.7856-63.744h385.536c-6.9632 26.3168-24.2176 63.744-66.048 63.744zM517.12 737.5872H118.8352V731.5456c0-50.6368 45.7728-87.4496 136.704-109.568a100.352 100.352 0 0 0 58.88 28.2624c58.3168 8.0384 124.5696-24.064 177.152-85.8624 63.6416-74.752 258.2528-309.4016 323.1744-387.6864 27.4432 26.9312 64.256 63.232 83.0464 81.92 7.8336 7.8848 23.9104 48.6912 11.4176 83.3024a62.5152 62.5152 0 0 1-15.36 23.6032c-1.1264 1.0752-2.3552 2.1504-3.6352 3.2256s-2.304 1.8432-3.5328 2.7648-2.6112 1.8944-3.9936 2.816l-2.7136 1.6384c-1.6896 1.024-3.4816 2.048-5.12 2.9696l-1.6896 0.9216c-2.5088 1.1776-5.12 2.304-7.8848 3.328l-2.2528 0.8704c-2.304 0.8192-4.7104 1.5872-7.168 2.3552l-2.048 0.6144c-3.1232 0.8704-6.3488 1.6896-9.6768 2.4064l-1.7408 0.3584-8.9088 1.5872-2.816 0.4096c-3.6864 0.512-7.3728 0.9728-11.264 1.3312-5.5808 0.512-11.1104 1.2288-16.5888 2.048l-5.12 0.8704c-3.7376 0.6656-7.424 1.3312-11.1104 2.0992l-6.0416 1.3312c-3.4304 0.8192-6.912 1.6896-10.24 2.6112l-5.8368 1.5872c-4.096 1.2288-8.1408 2.56-12.1344 3.9424l-6.8608 2.5088c-3.584 1.3312-7.1168 2.7136-10.6496 4.1984l-6.9632 3.1232-7.5264 3.584c-2.4576 1.2288-4.864 2.4576-7.2704 3.7888l-6.8608 3.7888-7.2704 4.1984c-2.56 1.5872-5.12 3.2256-7.5776 5.12s-3.7888 2.3552-5.632 3.6352l-1.6896 1.28c-80.896 56.2176-138.9056 157.4912-166.912 294.7584z m278.784-115.0464v219.7504H757.76v-317.44a137.8816 137.8816 0 0 0-5.4272-39.5264 202.8544 202.8544 0 0 1 40.96-15.0528l1.9456-0.512c4.4032-1.024 8.9088-1.9456 13.4656-2.7136l2.7648-0.4608c4.6592-0.7168 9.4208-1.3824 14.2848-1.792 2.048 0 4.1472-0.3584 6.1952-0.6144a385.1776 385.1776 0 0 0-35.9936 158.3616z"/></svg>',
  "配饰": '<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M525.492706 137.577412l16.323765 16.263529 16.263529-16.263529a105.291294 105.291294 0 0 1 175.525647 104.026353 382.976 382.976 0 0 1-191.849412 714.511059l-11.203764-0.301177h-2.529883A382.976 382.976 0 0 1 350.027294 241.543529a105.291294 105.291294 0 0 1 175.405177-103.905882z m96.015059 234.315294L541.756235 451.584 462.004706 371.892706l0.783059 2.409412a266.842353 266.842353 0 0 0 78.96847 521.517176l10.300236-0.240941h2.288941a266.721882 266.721882 0 0 0 66.499764-521.276235l0.662589-2.409412z m79.631059-79.510588l-34.514824 34.454588a327.258353 327.258353 0 0 1 197.933176 249.735529v-3.493647a322.620235 322.620235 0 0 0-163.418352-280.69647z m-482.123295 280.69647v3.252706a327.258353 327.258353 0 0 1 197.933177-249.494588l-34.514824-34.454588a322.620235 322.620235 0 0 0-163.418353 280.69647zM419.237647 180.163765a45.056 45.056 0 0 0 0 63.728941l122.578824 122.578823L664.395294 243.952941a45.056 45.056 0 0 0 4.336941-58.669176l-4.336941-5.059765a45.056 45.056 0 0 0-63.728941 0l-58.729412 58.789647-42.586353-42.405647-16.50447-16.384a45.056 45.056 0 0 0-63.668706 0z"/></svg>',
  "内衣": '<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M216.6 268c3.8 0 40.4 2.8 148.3 99 33.4 29.8 63.8 59.9 84.2 80.7-12.3 15-28.4 34.1-45.7 53.5-65.6 73.8-89.5 86.1-92.7 87.5-8.5 1.9-17.3 2.8-26.2 2.8-41.6 0-85.5-21-120.5-57.7-16.9-17.7-30.8-38.4-40.3-59.7-9.5-21.3-14.5-43.4-14.5-63.9 0-55.2 21.8-89.4 40-108.5 19.8-20.5 46.2-33.7 67.4-33.7m0-44c-62.4 0-151.3 64-151.3 186.2 0 110.3 105.6 225.3 219.3 225.3 12.2 0 24.5-1.3 36.8-4.1 49.5-11.3 186.2-186.2 186.2-186.2S303.3 224 216.6 224z" opacity="0.35"/><path d="M197.7 67.5c-7.7 0-14.1 5.9-14.6 13.6l-15.3 163.4c-0.6 8.5 6.1 15.8 14.6 15.8H213c8.5 0 15.3-7.3 14.6-15.8L212.3 81c-0.6-7.6-6.9-13.5-14.6-13.5zM823.7 67.5c-7.7 0-14.1 5.9-14.6 13.6l-15.3 163.4c-0.6 8.5 6.1 15.8 14.6 15.8h30.5c8.5 0 15.3-7.3 14.6-15.8L838.3 81c-0.6-7.6-7-13.5-14.6-13.5z"/><path d="M805.8 265c21.2 0 47.6 13.3 67.3 33.8 18.2 19 40 53.3 40 108.5 0 20.4-5 42.5-14.5 63.9s-23.4 42.1-40.3 59.7c-35 36.6-78.9 57.7-120.5 57.7-8.8 0-17.6-1-26.2-2.8-3.2-1.4-27-13.7-92.7-87.5-17.3-19.5-33.3-38.5-45.7-53.5 20.3-20.7 50.5-50.6 83.8-80.3C765.3 267.8 802 265 805.8 265m0-44c-86.7 0-291.1 221.2-291.1 221.2s136.8 175 186.2 186.2c12.3 2.8 24.6 4.1 36.8 4.1 113.8 0 219.3-115 219.3-225.3C957.1 285 868.2 221 805.8 221zM915.6 711.9v25.6c-48.7 20.2-150.1 61.9-192.5 75.7-28.8 9.3-66.6 30.8-112.6 63.9-19.8 14.3-36.8 27.5-47.3 36-10.2 0.3-27 0.5-49.2 0.5-23 0-40.2-0.2-50.4-0.5-12-8.8-32.7-23.8-55.7-39.8-66.8-46.4-91.4-58-104-62.7-29-10.8-141.7-53.7-195.1-74.1v-24.6h806.8m44-44H64.8v98.9s184.9 70.6 223.8 85C327.4 866.2 448 956.2 448 956.2c3.9 0.9 34.9 1.4 66 1.4s62.1-0.5 66-1.4c0 0 97.9-82.1 156.7-101.2s222.9-88.2 222.9-88.2v-98.9z"/><path d="M511.3 408.1c-16.4 0-29.7 13.3-29.7 29.7s13.3 29.7 29.7 29.7 29.7-13.3 29.7-29.7-13.3-29.7-29.7-29.7z"/></svg>',
};
const SLOT_ICONS_M: Record<string, string> = {
  "上衣": '<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M521.31 1013.71c-8.55 0-16.9-3.92-22.32-11.14L164.52 556.6a27.908 27.908 0 0 1-2.63-29.2l46.76-93.53-60.12-60.12a27.89 27.89 0 0 1-6.02-30.43l92.91-222.98c4.52-10.85 15.18-17.69 27.12-17.11 11.74 0.58 21.86 8.47 25.28 19.73l260.15 854.76c3.94 12.94-1.99 26.84-14.05 32.97a27.914 27.914 0 0 1-12.61 3.02zM219.45 536.93l229.01 305.35-191.41-628.91-55.91 134.17 61.13 61.13c8.48 8.47 10.59 21.45 5.23 32.17l-48.05 96.09z"/><path d="M521.27 1013.71c-4.26 0-8.57-0.98-12.59-3.01-12.07-6.13-17.99-20.03-14.05-32.97l260.15-854.76c3.42-11.25 13.54-19.14 25.28-19.73 11.79-0.36 22.59 6.26 27.12 17.11l92.91 222.98a27.89 27.89 0 0 1-6.02 30.43l-60.12 60.12 46.76 93.53c4.72 9.44 3.7 20.74-2.63 29.2l-334.47 445.96c-5.43 7.22-13.79 11.14-22.34 11.14z m264.26-800.34L594.12 842.28l229.01-305.35-48.04-96.08c-5.36-10.72-3.26-23.7 5.23-32.17l61.13-61.13-55.92-134.18z"/><path d="M869.04 1023H154.96c-33.11 0-60.89-24.81-64.62-57.71L4.74 211.95c-3.6-31.72 16.05-61.12 46.74-69.88L281.36 76.4l15.32 53.6L66.8 195.67a9.285 9.285 0 0 0-6.68 10l85.61 753.34c0.54 4.7 4.51 8.24 9.24 8.24h714.07c4.73 0 8.7-3.54 9.24-8.24l85.61-753.34c0.51-4.54-2.3-8.75-6.68-10L749.32 130l15.32-53.6 207.88 65.67c30.69 8.76 50.35 38.16 46.74 69.88l-85.61 753.34c-3.72 32.9-31.5 57.71-64.61 57.71z" opacity="0.35"/><path d="M329.9 298.33c-14.89 0-29.44-4.86-41.65-14.19-17.22-13.14-27.1-33.12-27.1-54.78V69.96c0-21.67 9.88-41.65 27.1-54.78C305.46 2.04 327.36-2.2 348.23 3.46l194.51 53.06V242.8l-194.52 53.06a69.793 69.793 0 0 1-18.32 2.47z m0.08-241.58c-3.67 0-6.41 1.6-7.9 2.72-1.94 1.49-5.19 4.81-5.19 10.49v159.4c0 5.68 3.25 9 5.19 10.49 1.93 1.47 6.01 3.76 11.47 2.23L487 200.23V99.08L333.56 57.24c-1.27-0.35-2.47-0.49-3.58-0.49z"/><path d="M720.37 298.33c-6.1 0-12.26-0.82-18.33-2.47L507.53 242.8V56.51L702.06 3.45c20.9-5.66 42.75-1.42 59.96 11.72 17.22 13.14 27.1 33.12 27.1 54.78v159.4c0 21.67-9.88 41.65-27.1 54.78-12.21 9.33-26.77 14.2-41.65 14.2z m-157.1-98.1l153.45 41.85c5.51 1.52 9.55-0.76 11.47-2.23 1.94-1.49 5.19-4.81 5.19-10.49V69.96c0-5.68-3.25-9-5.19-10.49-1.92-1.47-5.97-3.7-11.46-2.23L563.27 99.08v101.15z"/><path d="M614.2 121.78H428.38c-15.33 0-27.87 12.54-27.87 27.87 0 15.33 12.54 27.87 27.87 27.87H614.2c15.33 0 27.87-12.54 27.87-27.87 0-15.32-12.54-27.87-27.87-27.87z"/></svg>',
  "下装": '<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M910.896884 1024c-31.695238 0-265.752381 0-282.819048 0-19.504762 0-43.885714-12.190476-51.2-51.2C569.56355 933.790476 523.239741 587.580952 523.239741 587.580952S474.477836 943.542857 472.039741 972.8c0 29.257143-29.257143 51.2-51.2 51.2-24.380952 0-282.819048 0-309.638095 0-26.819048 0-56.07619-14.628571-51.2-51.2C64.877836 936.228571 138.020693 0 138.020693 0l168.228571 0 26.819048 0 553.447619 0c0 0 75.580952 943.542857 78.019048 972.8C964.534979 1002.057143 942.592122 1024 910.896884 1024zM498.858789 51.2l-153.6 0 0 90.209524c0 7.314286-4.87619 12.190476-12.190476 12.190476l-26.819048 0c-7.314286 0-12.190476-4.87619-12.190476-12.190476L294.058789 51.2 189.220693 51.2 111.201646 972.8l309.638095 0c0 0 48.761905-346.209524 78.019048-512C498.858789 336.457143 498.858789 51.2 498.858789 51.2zM601.258789 51.2l-51.2 0c0 0 0 243.809524 0 280.380952 0-14.628571 51.2-17.066667 51.2-51.2C601.258789 246.247619 601.258789 51.2 601.258789 51.2zM832.877836 51.2l-180.419048 0c0 0 0 236.495238 0 256 0 39.009524-102.4 63.390476-102.4 102.4 0 97.52381 78.019048 563.2 78.019048 563.2l282.819048 0L832.877836 51.2z"/></svg>',
  "鞋子": '<svg viewBox="0 0 2574 1024" fill="currentColor"><path d="M837.67058319 780.52376322C644.02319392 780.52376322 547.41708038 742.22944827 542.19512865 663.90016709a21.75813386 21.75813386 0 0 1 2.17581292-11.09664802c4.56920822-9.35599727 53.74258986-93.34239338 345.73674339-141.21028748 121.84554839-20.01748313 311.14131076-174.06506883 313.09954285-176.24088226 11.96697338-9.57357861 117.27634016-91.81932397 177.76395168-91.81932398a49.17338215 49.17338215 0 0 1 39.38222169 16.75376296 74.41281699 74.41281699 0 0 1 10.66148585 62.66342495c-2.82855748 16.31860026 2.39339479 21.75813386 3.91646365 24.36910946a80.50509461 80.50509461 0 0 0 57.65905404 14.79553086c108.79066828 0 295.47545453-71.14909685 297.43368663-71.80184087a21.75813386 21.75813386 0 0 1 26.10976074 8.70325376c4.13404554 6.74502167 102.91597199 164.92665291 69.19086474 342.69060406a21.75813386 21.75813386 0 0 1-21.75813387 17.62408834c-3.4813015 0-359.2267862 5.65711494-558.74887121 68.32053989a2338.34662005 2338.34662005 0 0 1-467.14712856 52.87226446zM585.71139585 668.03421263c11.31422935 43.51626722 101.61048394 68.75570205 250.8712806 68.75570204a2333.55983049 2333.55983049 0 0 0 455.61531789-50.9140329c181.02767183-57.00631001 475.63280098-67.88537668 552.43901275-69.84360876 16.97134431-124.67410586-35.9009207-239.33946991-57.44147322-278.93927292-50.47887021 18.27683235-197.78143478 68.32053936-295.47545452 68.32053936-43.51626722 0-73.54249162-9.79115995-90.94899808-30.24380575a70.27877146 70.27877146 0 0 1-13.70762414-59.61728613c3.69888284-21.75813386 0-27.19766694 0-27.4152483a10.22632263 10.22632263 0 0 0-6.09227764-1.0879067C1347.24607224 287.04929257 1270.43986047 337.52816277 1230.40489476 369.29503793c-7.83292786 6.52744032-199.95724769 163.62116484-333.3346068 185.3792982C668.17472204 591.66316354 601.59483344 651.06286831 585.71139585 668.03421263z"/><path d="M1444.50492981 778.56553113a21.75813386 21.75813386 0 0 1-21.75813386-21.75813334v-82.02816403a21.75813386 21.75813386 0 0 1 19.36473908-21.75813334l416.45067755-48.08547543a21.75813386 21.75813386 0 0 1 24.15152812 21.75813332v130.54880217a21.75813386 21.75813386 0 0 1-21.75813334 21.75813334H1444.50492981z m21.75813334-84.42155829v40.90529109h372.49924766v-83.98639562z" opacity="0.35"/><path d="M1197.33253153 480.0439378a10.87906667 10.87906667 0 0 1-7.61534651-3.26371965l-56.35356598-56.13598515a10.87906667 10.87906667 0 1 1 15.4482749-15.44827489L1204.94787857 461.11436191a10.87906667 10.87906667 0 0 1-7.61534704 18.49441318zM1251.07512191 446.31883105a10.87906667 10.87906667 0 0 1-7.61534704-3.26372015l-56.13598463-56.13598464a10.87906667 10.87906667 0 1 1 15.44827489-15.44827489l56.13598462 56.13598464a10.87906667 10.87906667 0 0 1-7.6153465 18.4944137zM1303.72980503 411.07065439a10.87906667 10.87906667 0 0 1-7.61534652-3.26372015L1238.45540448 352.32369362a10.87906667 10.87906667 0 0 1 15.4482749-15.44827488l56.13598462 56.13598463a10.87906667 10.87906667 0 0 1-6.30985897 18.05925102z"/></svg>',
};

function getSlotIcon(slot: string): string {
  const map = outfitChar.value === "erii" ? SLOT_ICONS_F : SLOT_ICONS_M;
  return map[slot] || "";
}

const eriiItems = computed(() => store.data.绘梨衣.持有物品 || ({} as Record<string, string>));
const lmfItems = computed(() => store.data.路明非.持有物品 || ({} as Record<string, string>));

// 物品弹窗
interface SelectedItem { owner: string; name: string; desc: string; }
const selectedItem = ref<SelectedItem | null>(null);
function openItem(owner: string, name: string, desc: string) {
  selectedItem.value = { owner, name, desc };
}

// 天气 - 直接从 schema 读取，带 fallback
const weatherRaw = computed(() => {
  try { return (store.data as any)?.系统?.天气 || "晴"; }
  catch { return "晴"; }
});

const weatherLabel = computed(() => {
  const w = weatherRaw.value;
  if (!w) return "晴";
  return w;
});

// 天气 SVG path - 根据天气文字选择图标
const weatherSvgPath = computed(() => {
  const w = weatherRaw.value || "";
  if (w.includes("暴") || w.includes("雷")) {
    return '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/>';
  }
  if (w.includes("雨")) {
    return '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><line x1="16" y1="13" x2="16" y2="20"/><line x1="12" y1="15" x2="12" y2="23"/><line x1="8" y1="19" x2="8" y2="21"/>';
  }
  if (w.includes("雪")) {
    return '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="17" x2="8" y2="22"/><line x1="16" y1="17" x2="16" y2="22"/>';
  }
  if (w.includes("阴") || w.includes("云")) {
    return '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>';
  }
  if (w.includes("晴")) {
    return '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
  return '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
});


// ===== 页面滑动切换（px 基准，真正 1:1 跟手） =====
const currentPage = ref(1);
const totalPages = 5;
const displayRef = ref<HTMLElement | null>(null);

const isDragging = ref(false);
const dragStartX = ref(0);
const dragOffset = ref(0);
const hasMoved = ref(false);
const posHistory = ref<{ t: number; x: number }[]>([]);
const DRAG_THRESHOLD = 8;

// translateX 用 px，相对于 display-unit 宽度，不再受 view-wrapper 500% 影响
const viewTransform = computed(() => {
  const dw = displayRef.value?.clientWidth || 1;

  if (!isDragging.value) {
    const targetX = -(currentPage.value - 1) * dw;
    return { transform: `translateX(${targetX}px)`, transition: "transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)" };
  }

  const baseX = -(currentPage.value - 1) * dw;
  let totalX = baseX + dragOffset.value;

  // 边界阻尼
  if (currentPage.value === 1 && dragOffset.value > 0) {
    totalX = baseX + dragOffset.value * 0.2;
  } else if (currentPage.value === totalPages && dragOffset.value < 0) {
    totalX = baseX + dragOffset.value * 0.2;
  }

  return { transform: `translateX(${totalX}px)`, transition: "none" };
});

// 松手：惯性 + 最近页
function snapToPage() {
  const dw = displayRef.value?.clientWidth || 1;

  // 松手速度（最近 5 帧平均）
  let velocity = 0;
  const hist = posHistory.value;
  if (hist.length >= 2) {
    const first = hist[0];
    const last = hist[hist.length - 1];
    const dt = last.t - first.t;
    if (dt > 0) velocity = (last.x - first.x) / dt;
  }

  // 惯性距离（px）
  const inertia = velocity * 250;

  // 目标位置
  const targetX = dragOffset.value + inertia;

  // 换算为页号
  const rawPageFloat = currentPage.value - 1 + (-targetX / dw);
  let targetPage = Math.round(rawPageFloat) + 1;
  targetPage = Math.max(1, Math.min(totalPages, targetPage));

  // 每次最多切一页
  if (targetPage > currentPage.value + 1) targetPage = currentPage.value + 1;
  if (targetPage < currentPage.value - 1) targetPage = currentPage.value - 1;

  currentPage.value = targetPage;
}

// ===== Touch =====
function onTouchStart(e: TouchEvent) {
  dragStartX.value = e.touches[0].clientX;
  dragOffset.value = 0;
  hasMoved.value = false;
  isDragging.value = false;
  posHistory.value = [];
}
function onTouchMove(e: TouchEvent) {
  const dx = e.touches[0].clientX - dragStartX.value;
  if (!hasMoved.value && Math.abs(dx) < DRAG_THRESHOLD) return;
  if (!hasMoved.value) {
    hasMoved.value = true;
    isDragging.value = true;
    e.preventDefault();
  }
  dragOffset.value = dx;
  const now = Date.now();
  posHistory.value.push({ t: now, x: dx });
  if (posHistory.value.length > 5) posHistory.value.shift();
}
function onTouchEnd() {
  if (hasMoved.value) {
    snapToPage();
    dragOffset.value = 0;
    isDragging.value = false;
    posHistory.value = [];
  }
}

// ===== Mouse =====
function onMouseDown(e: MouseEvent) {
  dragStartX.value = e.clientX;
  dragOffset.value = 0;
  hasMoved.value = false;
  isDragging.value = false;
  posHistory.value = [];
}
function onMouseMove(e: MouseEvent) {
  if (e.buttons !== 1) return;
  const dx = e.clientX - dragStartX.value;
  if (!hasMoved.value && Math.abs(dx) < DRAG_THRESHOLD) return;
  if (!hasMoved.value) {
    hasMoved.value = true;
    isDragging.value = true;
  }
  dragOffset.value = dx;
  const now = Date.now();
  posHistory.value.push({ t: now, x: dx });
  if (posHistory.value.length > 5) posHistory.value.shift();
}
function onMouseUp() {
  if (hasMoved.value) {
    snapToPage();
    dragOffset.value = 0;
    isDragging.value = false;
    posHistory.value = [];
  }
}
function onMouseLeave() {
  if (hasMoved.value && isDragging.value) {
    snapToPage();
    dragOffset.value = 0;
    isDragging.value = false;
    posHistory.value = [];
  }
}

function goPrev() {
  currentPage.value = currentPage.value <= 1 ? totalPages : currentPage.value - 1;
}
function goNext() {
  currentPage.value = currentPage.value >= totalPages ? 1 : currentPage.value + 1;
}

watch(currentPage, (p) => {
  const radio = document.getElementById(`f${p}`) as HTMLInputElement | null;
  if (radio) radio.checked = true;
});
</script>

<style lang="scss" scoped>
.container {
  --titanium: #d1d5db;
  --titanium-light: #f9fafb;
  --titanium-dark: #9ca3af;
  --screen-bg: #fffef2;
  --ring-red: #ff3b30;
  --ring-green: #34c759;
  --ring-blue: #007aff;
  --banana: #eab308;
  --banana-light: #fef9c3;
  --text-main: #1c1c1e;
  --text-dim: #8e8e93;
  --case-shadow: rgba(0, 0, 0, 0.15);
  --watch-w: 403px;
  --watch-h: 488px;
  --ease: cubic-bezier(0.2, 1, 0.2, 1);

    width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  font-family: "Inter", "Segoe UI", "Yu Gothic", "Microsoft YaHei", sans-serif;
  user-select: none;
}

/* 日夜模式颜色切换 */
.container.dark-mode {
  --screen-bg: #1c1c1e;
  --text-main: #f5f5f7;
  --text-dim: #98989d;
  --titanium: #5a5a5e;
  --titanium-light: #48484a;
  --titanium-dark: #3a3a3c;
}

/* 表外层包装 - 提供高度 */
.watch-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
    padding: 20px 0;
    width: 100%;
    overflow: hidden;
}

.container input[type="radio"] { display: none; }


/* ===== 左右方向键 ===== */
.dir-btn {
  position: absolute;
  top: 50%;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 52px;
  height: 72px;
  border-radius: 18px;
  background: linear-gradient(145deg, var(--titanium-light), var(--titanium), var(--titanium-dark));
  border: 1px solid #c2c6cc;
  box-shadow:
    0 4px 12px rgba(0,0,0,0.08),
    inset 0 1px 1px rgba(255,255,255,0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.dir-btn:hover {
  box-shadow:
    0 6px 20px rgba(0,0,0,0.12),
    inset 0 1px 1px rgba(255,255,255,0.6);
  transform: scale(1.04);
}

.dir-btn:active {
  transform: scale(0.96);
  box-shadow:
    0 2px 6px rgba(0,0,0,0.08),
    inset 0 2px 4px rgba(0,0,0,0.08);
}

.dir-left { left: -70px; transform: translateY(-50%); }
.dir-left:hover { left: -70px; transform: translateY(-50%) scale(1.04); }
.dir-left:active { left: -70px; transform: translateY(-50%) scale(0.96); }

.dir-right { right: -70px; transform: translateY(-50%); }
.dir-right:hover { right: -70px; transform: translateY(-50%) scale(1.04); }
.dir-right:active { right: -70px; transform: translateY(-50%) scale(0.96); }

.dark-mode .dir-btn {
  background: linear-gradient(145deg, #48484a, #5a5a5e, #3a3a3c);
  border-color: #48484a;
}

.dir-arrow {
  font-family: "Georgia", serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1;
}

.dir-label {
  font-size: 9px;
  font-weight: 800;
  color: var(--text-dim);
  letter-spacing: 1.5px;
}
/* ===== 表容器 ===== */
.watch-container {
    width: 100%;
    position: relative;
    max-width: var(--watch-w);
    aspect-ratio: 403 / 488;
  perspective: 2000px;
}

/* ===== 表壳 ===== */
.watch-case {
  position: relative;
    width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--titanium-light), var(--titanium), var(--titanium-dark));
  border-radius: 88px;
  z-index: 10;
  box-shadow:
    0 60px 100px var(--case-shadow),
    inset 0 1px 1px rgba(255,255,255,0.9),
    inset 0 -3px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;
  box-sizing: border-box;
  border: 1px solid #c2c6cc;
}

.dark-mode .watch-case {
  border-color: #48484a;
}

/* 表冠 */
.crown-well { position: absolute; right: -3px; top: 70px; width: 15px; height: 115px; background: rgba(0,0,0,0.15); border-radius: 12px; z-index: 8; box-shadow: inset 2px 0 5px rgba(0,0,0,0.2); }
.crown { position: absolute; right: -15px; top: 95px; width: 26px; height: 65px; background: linear-gradient(to right, #d1d5db, #f3f4f6, #9ca3af); border-radius: 8px; z-index: 20; box-shadow: 4px 2px 10px rgba(0,0,0,0.15); }
.crown::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 15px; height: 15px; background: radial-gradient(circle, #f3f4f6 30%, #9ca3af 100%); border-radius: 50%; border: 1px solid rgba(0,0,0,0.1); z-index: 21; }
.crown::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px); border-radius: 8px; }

/* 侧键 */
.side-btn-well { position: absolute; right: -3px; top: 200px; width: 10px; height: 85px; background: rgba(0,0,0,0.15); border-radius: 12px; z-index: 8; box-shadow: inset 2px 0 5px rgba(0,0,0,0.1); }
.side-btn { position: absolute; right: -8px; top: 210px; width: 11px; height: 65px; background: linear-gradient(to right, #9ca3af, #d1d5db); border-radius: 5px; z-index: 15; border: 1px solid #8e939c; box-shadow: inset 0 1px 1px rgba(255,255,255,0.6), 1px 1px 3px rgba(0,0,0,0.1); }

/* Action 键 */
.action-btn-well { position: absolute; left: -3px; top: 160px; width: 10px; height: 115px; background: rgba(0,0,0,0.15); border-radius: 12px; z-index: 8; box-shadow: inset -2px 0 5px rgba(0,0,0,0.1); }
.action-btn { position: absolute; left: -8px; top: 175px; width: 11px; height: 90px; background: linear-gradient(to left, var(--banana), #facc15); border-radius: 5px; z-index: 15; border: 1px solid #ca8a04; box-shadow: inset 0 1px 2px rgba(255,255,255,0.6), -1px 1px 3px rgba(0,0,0,0.1); }

/* ===== 屏幕 ===== */
.display-unit {
    width: 100%;
  height: 100%;
  background: var(--screen-bg);
  border-radius: 76px;
  overflow: hidden;
  touch-action: pan-y;
  position: relative;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.02);
  border: 6px solid #000;
}

.dark-mode .display-unit {
  border-color: #2c2c2e;
}

.display-unit::after {
  content: "";
  position: absolute;
  top: -40%; left: -40%;
  width: 150%; height: 150%;
  background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.1) 100%);
  z-index: 100; pointer-events: none;
  transition: 0.8s var(--ease);
}

.dark-mode .display-unit::after {
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%);
}

.watch-case:hover .display-unit::after { transform: translate(20px, 20px); }

/* ===== 状态条 ===== */
.status-bar {
  position: absolute;
  top: 30px; left: 0; right: 0;
  padding: 0 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  color: var(--text-main);
  z-index: 80;
}

.battery { color: var(--ring-green); }
.bolt { display: inline-block; }

/* ===== 页面滑动 ===== */
.view-wrapper {
  width: 500%;
  height: 100%;
  display: flex;
  cursor: grab;
  user-select: none;
}

.view {
  width: 20%;
  height: 100%;
  padding: 70px 45px 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  color: var(--text-main);
}

/* ===== 第1页：时间日期天气 ===== */
.face-ultra { align-items: center; justify-content: center; }

.main-time { text-align: center; margin-top: 10px; }
.main-time .h2 {
  font-family: "JetBrains Mono", monospace;
  font-size: 96px; margin: 0;
  font-weight: 800; letter-spacing: -6px;
  color: var(--text-main); line-height: 0.85;
}
.main-time span { color: var(--banana); font-size: 28px; font-weight: 800; letter-spacing: 2px; }

.comp {
  position: absolute;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 20px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-weight: 700;
}

.dark-mode .comp {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.05);
}

.comp-top-left { top: 92px; left: 58px; width: 72px; height: 72px; }
.comp-top-right { top: 92px; right: 58px; width: 72px; height: 72px; }
.comp-bottom { bottom: 85px; left: 58px; right: 58px; height: 66px; flex-direction: row; justify-content: center; padding: 0 20px; text-align: center; }

/* 日夜切换框 */
.comp-toggle { gap: 2px; }

.toggle-text {
  font-size: 13px;
  color: var(--banana);
  font-weight: 800;
  letter-spacing: 1px;
}

.toggle-comp {
  gap: 3px;
  padding: 6px 4px 4px;
}

.switch-sm {
  width: 44px;
  height: 24px;
}

.switch-sm .slider::before {
  height: 20px; width: 20px;
}

.switch-sm .input:checked + .slider::before {
  transform: translateX(20px);
}

.switch-sm .sun svg {
  top: 4px; left: 24px;
  width: 16px; height: 16px;
}

.switch-sm .moon svg {
  top: 3px; left: 3px;
  width: 16px; height: 16px;
}

.mode-label {
  font-size: 9px;
  color: var(--text-dim);
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-top: 1px;
}

/* 天气框 */
.weather-box { gap: 2px; }
.weather-svg {
  width: 22px; height: 22px;
  color: var(--banana);
  stroke: currentColor; fill: none;
  stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
}
.weather-text {
  font-size: 13px; color: var(--banana);
  font-weight: 800; letter-spacing: 1px;
}

.comp-label-sm { font-size: 15px; opacity: 0.6; font-weight: 800; }
.comp-val { font-size: 18px; font-weight: 800; max-width: 230px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ===== 日夜切换 ===== */
.switch {
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 56px;
  height: 30px;
}

.switch .input { opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute; cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #73C0FC;
  transition: 0.4s;
  border-radius: 30px;
}

.slider::before {
  position: absolute; content: "";
  height: 26px; width: 26px;
  border-radius: 26px;
  left: 2px; bottom: 2px;
  z-index: 2;
  background-color: #e8e8e8;
  transition: 0.4s;
}

.sun svg {
  position: absolute;
  top: 5px; left: 32px;
  z-index: 1;
  width: 20px; height: 20px;
  animation: rotate-sun 15s linear infinite;
}

.moon svg {
  fill: #73C0FC;
  position: absolute;
  top: 4px; left: 4px;
  z-index: 1;
  width: 20px; height: 20px;
  animation: tilt-moon 5s linear infinite;
}

@keyframes rotate-sun {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}

@keyframes tilt-moon {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

.input:checked + .slider { background-color: #183153; }
.input:checked + .slider::before { transform: translateX(26px); }

/* ===== 第2页：穿搭（衣柜风格） ===== */
.face-outfit {
  flex-direction: column;
  gap: 0;
  align-items: stretch;
  justify-content: flex-start;
  padding: 62px 0 0;
}

/* ---- 角色切换导航 ---- */
.wardrobe-nav {
  display: flex;
  gap: 8px;
  padding: 0 24px 10px;
  flex-shrink: 0;
}

.char-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.06);
  background: rgba(0,0,0,0.02);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-dim);
  transition: all 0.25s ease;
  outline: none;
  font-family: inherit;
}

.char-btn:hover {
  background: rgba(0,0,0,0.04);
  border-color: rgba(0,0,0,0.1);
}

.char-btn.active {
  background: rgba(234,179,8,0.1);
  border-color: rgba(234,179,8,0.3);
  color: var(--banana);
  box-shadow: 0 0 0 2px rgba(234,179,8,0.08);
}

.dark-mode .char-btn {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.06);
  color: var(--text-dim);
}

.dark-mode .char-btn:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.1);
}

.dark-mode .char-btn.active {
  background: rgba(234,179,8,0.12);
  border-color: rgba(234,179,8,0.3);
  color: var(--banana);
  box-shadow: 0 0 0 2px rgba(234,179,8,0.1);
}

.char-icon-f,
.char-icon-m {
  width: 18px; height: 18px;
  flex-shrink: 0;
}

.char-btn.active .char-icon-f { color: #e8799a; }
.char-btn.active .char-icon-m { color: #60a5fa; }

.dark-mode .char-btn.active .char-icon-f { color: #f472b6; }
.dark-mode .char-btn.active .char-icon-m { color: #93c5fd; }

/* ---- 衣柜卡片列表 ---- */
.wardrobe-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 22px 12px;
  overflow-y: auto;
  flex: 1;
}

.wardrobe-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 14px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.2s ease;
  cursor: default;
}

.dark-mode .wardrobe-card {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.05);
}

/* 衣柜图标 */
.wc-icon {
  width: 32px; height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(0,0,0,0.03);
  flex-shrink: 0;
  color: var(--text-dim);
}

.wc-icon svg {
  width: 20px; height: 20px;
}

.dark-mode .wc-icon {
  background: rgba(255,255,255,0.04);
}

/* 衣柜文字 */
.wc-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.wc-slot {
  font-size: 12px; font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.wc-desc {
  font-size: 16px; font-weight: 700;
  color: var(--text-main);
  line-height: 1.3;
  word-break: break-word;
}

.wc-empty {
  color: #c7c7cc;
  font-style: italic;
  font-weight: 500;
}

.dark-mode .wc-empty { color: #636366; }

/* ===== 第3页：持有物 ===== */
.face-items {
  justify-content: center;
  gap: 16px;
}

.items-col {
  display: flex; flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.items-col-title {
  font-size: 13px; font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 2px;
  text-transform: uppercase;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.dark-mode .items-col-title {
  border-color: rgba(255,255,255,0.06);
}

.items-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  overflow-y: auto;
  max-height: 155px;
  align-content: start;
}

/* Apple风格物品卡片 */
.item-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  min-height: 38px;
}

.item-card:hover {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.item-card:active {
  background: rgba(0, 0, 0, 0.07);
  transform: scale(0.97);
}

.item-card-name {
  font-size: 14px; font-weight: 600;
  color: #1c1c1e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark-mode .item-card {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark-mode .item-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dark-mode .item-card:active {
  background: rgba(255, 255, 255, 0.08);
}

.dark-mode .item-card-name {
  color: #f5f5f7;
}

.item-empty {
  grid-column: 1 / -1;
  font-size: 14px; color: var(--text-dim);
  text-align: center;
  padding: 16px 0;
}

/* ===== 物品详情弹窗 ===== */
.item-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  padding: 16px;
}

.item-modal {
  position: relative;
    width: min(320px, 100%);
    max-height: 480px;
  overflow-y: auto;
  padding: 28px 24px 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 16px 48px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dark-mode .item-modal {
  background: rgba(44, 44, 46, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.2),
    0 16px 48px rgba(0, 0, 0, 0.4);
}

.item-modal-owner {
  font-size: 12px; font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.6;
}

.item-modal-name {
  font-size: 22px; font-weight: 800;
  color: var(--text-main);
  line-height: 1.2;
  letter-spacing: -0.3px;
}

.item-modal-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.08), transparent);
  opacity: 0.6;
}

.dark-mode .item-modal-divider {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08), transparent);
}

.item-modal-body {
  flex: 1;
  overflow-y: auto;
}

.item-modal-desc {
  font-size: 14px; color: var(--text-dim);
  line-height: 1.7;
  word-break: break-word;
}

/* shadcn outline 风格关闭按钮 */
.item-modal-close {
  align-self: center;
  margin-top: 4px;
  color: #1c1c1e;
  padding: 7px 22px;
  font-size: 14px; font-weight: 600;
  border-radius: 10px;
  background: #ffffff;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  outline: none;
}

.item-modal-close:hover {
  background: #f5f5f7;
  border-color: rgba(0, 0, 0, 0.18);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.item-modal-close:active {
  background: #e8e8ea;
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
  transform: translateY(0);
}

.dark-mode .item-modal-close {
  color: #f5f5f7;
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.dark-mode .item-modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark-mode .item-modal-close:active {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 弹窗过渡动画 */
.modal-fade-enter-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-active .item-modal {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-leave-active .item-modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-fade-enter-from {
  opacity: 0;
}
.modal-fade-enter-from .item-modal {
  transform: scale(0.92) translateY(12px);
  opacity: 0;
}
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-leave-to .item-modal {
  transform: scale(0.95);
  opacity: 0;
}

/* ===== 第4页：好感度 ===== */
.hr-view { align-items: center; justify-content: center; }

.heart-svg {
  width: 60px; height: 60px;
  fill: #000;
  animation: beat 0.8s infinite;
  transition: fill 0.6s ease;
}

.dark-mode .heart-svg { fill: #fff; }

.favor-num {
  font-size: 78px; margin: 12px 0 0;
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  color: #000;
  transition: color 0.6s ease;
}

.dark-mode .favor-num { color: #fff; }

.favor-label {
  color: var(--text-dim); font-size: 18px;
  font-weight: 800; letter-spacing: 2px;
}

@keyframes beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 12px rgba(239,68,68,0.3)); }
}

/* ===== 第5页：地图 ===== */
.face-map {
  align-items: center;
  justify-content: center;
  padding: 70px 12px 32px;
}

/* ===== 导航点 ===== */
.nav {
  position: absolute; bottom: 26px;
  left: 50%; transform: translateX(-50%);
  display: flex; gap: 10px;
  z-index: 150;
}

.dot {
  width: 9px; height: 9px;
  background: rgba(0,0,0,0.1);
  border-radius: 50%; cursor: pointer;
  transition: 0.4s var(--ease);
}

.dark-mode .dot {
  background: rgba(255,255,255,0.15);
}


#f1:checked ~ .watch-wrapper .watch-container .d1,
#f2:checked ~ .watch-wrapper .watch-container .d2,
#f3:checked ~ .watch-wrapper .watch-container .d3,
#f4:checked ~ .watch-wrapper .watch-container .d4,
#f5:checked ~ .watch-wrapper .watch-container .d5 {
  background: var(--text-main);
  width: 22px; border-radius: 5px;
}
</style>