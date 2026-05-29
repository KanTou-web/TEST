<template>
  <div
    ref="containerRef"
    class="location-map"
    :class="{ 'is-expanded': isExpanded, 'is-hovered': isHovered, 'map-dark': isDarkMode }"
    @mousemove="onMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="onMouseLeave"
    @click="toggleExpand"
  >
    <div class="map-card" :style="cardStyle">
      <!-- 背景渐变 -->
      <div class="card-bg"></div>

      <!-- 展开后的地图详情 -->
      <Transition name="map-detail">
        <div v-if="isExpanded" class="map-detail">
          <div class="map-base"></div>

          <!-- 路网 SVG -->
          <svg class="map-roads" viewBox="0 0 240 180" preserveAspectRatio="none">
            <!-- 主干道 - 水平 -->
            <line
              x1="0" y1="35%" x2="100%" y2="35%"
              class="road r-main-h" stroke-width="4"
              style="animation-delay: 0.2s"
            />
            <line
              x1="0" y1="65%" x2="100%" y2="65%"
              class="road r-main-h" stroke-width="4"
              style="animation-delay: 0.3s"
            />
            <!-- 主干道 - 垂直 -->
            <line
              x1="30%" y1="0" x2="30%" y2="100%"
              class="road r-main-v" stroke-width="3"
              style="animation-delay: 0.4s"
            />
            <line
              x1="70%" y1="0" x2="70%" y2="100%"
              class="road r-main-v" stroke-width="3"
              style="animation-delay: 0.5s"
            />
            <!-- 次干道 - 水平 -->
            <line
              x1="0" y1="20%" x2="100%" y2="20%"
              class="road r-side-h" stroke-width="1.5"
              style="animation-delay: 0.6s"
            />
            <line
              x1="0" y1="50%" x2="100%" y2="50%"
              class="road r-side-h" stroke-width="1.5"
              style="animation-delay: 0.7s"
            />
            <line
              x1="0" y1="80%" x2="100%" y2="80%"
              class="road r-side-h" stroke-width="1.5"
              style="animation-delay: 0.8s"
            />
            <!-- 次干道 - 垂直 -->
            <line
              x1="15%" y1="0" x2="15%" y2="100%"
              class="road r-side-v" stroke-width="1.5"
              style="animation-delay: 0.7s"
            />
            <line
              x1="45%" y1="0" x2="45%" y2="100%"
              class="road r-side-v" stroke-width="1.5"
              style="animation-delay: 0.8s"
            />
            <line
              x1="55%" y1="0" x2="55%" y2="100%"
              class="road r-side-v" stroke-width="1.5"
              style="animation-delay: 0.9s"
            />
            <line
              x1="85%" y1="0" x2="85%" y2="100%"
              class="road r-side-v" stroke-width="1.5"
              style="animation-delay: 1.0s"
            />

            <!-- 附近地点标注 -->
            <template v-for="(pt, i) in nearbyPlaces" :key="pt.name">
              <circle
                :cx="pt.x" :cy="pt.y" r="2.5"
                class="place-dot"
                :style="{ animationDelay: (1.1 + i * 0.09) + 's' }"
              />
              <text
                :x="pt.x" :y="pt.y - 6"
                class="place-label" text-anchor="middle"
                :style="{ animationDelay: (1.15 + i * 0.09) + 's' }"
              >{{ pt.name }}</text>
            </template>
          </svg>

          <!-- 建筑区块 -->
          <div
            class="building"
            style="top: 40%; left: 10%; width: 15%; height: 20%; animation-delay: 0.5s"
          ></div>
          <div
            class="building"
            style="top: 15%; left: 35%; width: 12%; height: 15%; animation-delay: 0.6s"
          ></div>
          <div
            class="building"
            style="top: 70%; left: 75%; width: 18%; height: 18%; animation-delay: 0.7s"
          ></div>
          <div
            class="building"
            style="top: 20%; right: 10%; width: 10%; height: 25%; animation-delay: 0.55s"
          ></div>
          <div
            class="building"
            style="top: 55%; left: 5%; width: 8%; height: 12%; animation-delay: 0.65s"
          ></div>
          <div
            class="building"
            style="top: 8%; left: 75%; width: 14%; height: 10%; animation-delay: 0.75s"
          ></div>

          <!-- 中心定位点 -->
          <div class="center-pin">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="pin-svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#eab308" />
              <circle cx="12" cy="9" r="2.5" class="pin-inner" />
            </svg>
          </div>

          <!-- 底部渐变 -->
          <div class="map-bottom-fade"></div>
        </div>
      </Transition>

      <!-- 网格纹理 -->
      <div class="card-grid" :style="{ opacity: isExpanded ? 0 : 0.03 }"></div>

      <!-- 内容 -->
      <div class="card-content">
        <div class="card-top">
          <svg
            width="18" height="18"
            viewBox="0 0 24 24" fill="none" stroke="#eab308"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="map-icon"
          >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" x2="9" y1="3" y2="18" />
            <line x1="15" x2="15" y1="6" y2="21" />
          </svg>
          <span class="live-tag"><span class="live-dot"></span>Live</span>
        </div>
        <div class="card-bottom">
          <span class="location-name">{{ location }}</span>
          <Transition name="map-fade">
            <span v-if="weather" class="location-weather">{{ weather }}</span>
          </Transition>
          <div class="card-underline"></div>
        </div>
      </div>
    </div>

    <!-- 悬浮提示 -->
    <Transition name="hint-fade">
      <span v-if="isHovered && !isExpanded" class="click-hint">点击展开地图</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  location?: string;
  weather?: string;
  isDarkMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  location: "未知地点",
  weather: "",
  isDarkMode: false,
});

const isHovered = ref(false);
const isExpanded = ref(false);
const containerRef = ref<HTMLDivElement>();
const mouseX = ref(0);
const mouseY = ref(0);

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}

const cardStyle = computed(() => {
  const rx = mouseY.value * 0.06;
  const ry = mouseX.value * -0.06;
  return {
    transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    width: isExpanded.value ? "360px" : "240px",
    height: isExpanded.value ? "280px" : "140px",
  };
});

function onMouseMove(e: MouseEvent) {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  mouseX.value = e.clientX - cx;
  mouseY.value = e.clientY - cy;
}

function onMouseLeave() {
  mouseX.value = 0;
  mouseY.value = 0;
  isHovered.value = false;
}

// ===== 东京地点坐标 =====
interface TokyoPlace { name: string; lat: number; lng: number; }

const tokyoPlaces: TokyoPlace[] = [
  { name: "新宿", lat: 35.6895, lng: 139.7006 },
  { name: "涩谷", lat: 35.6580, lng: 139.7016 },
  { name: "池袋", lat: 35.7295, lng: 139.7109 },
  { name: "银座", lat: 35.6722, lng: 139.7670 },
  { name: "秋叶原", lat: 35.7023, lng: 139.7745 },
  { name: "上野", lat: 35.7146, lng: 139.7739 },
  { name: "浅草", lat: 35.7148, lng: 139.7967 },
  { name: "墨田", lat: 35.7106, lng: 139.8014 },
  { name: "江东", lat: 35.6730, lng: 139.8170 },
  { name: "品川", lat: 35.6090, lng: 139.7302 },
  { name: "目黑", lat: 35.6345, lng: 139.6982 },
  { name: "世田谷", lat: 35.6466, lng: 139.6535 },
  { name: "中野", lat: 35.7073, lng: 139.6636 },
  { name: "杉并", lat: 35.6996, lng: 139.6364 },
  { name: "丰岛区", lat: 35.7347, lng: 139.7160 },
  { name: "文京区", lat: 35.7088, lng: 139.7524 },
  { name: "台东区", lat: 35.7126, lng: 139.7800 },
  { name: "中央区", lat: 35.6723, lng: 139.7708 },
  { name: "千代田", lat: 35.6912, lng: 139.7524 },
  { name: "港区", lat: 35.6581, lng: 139.7514 },
  { name: "大田区", lat: 35.5613, lng: 139.7161 },
  { name: "北区", lat: 35.7522, lng: 139.7334 },
  { name: "板桥", lat: 35.7610, lng: 139.7090 },
  { name: "练马", lat: 35.7356, lng: 139.6517 },
  { name: "足立", lat: 35.7757, lng: 139.8045 },
  { name: "葛饰", lat: 35.7465, lng: 139.8472 },
  { name: "江户川", lat: 35.6792, lng: 139.8780 },
];

function findPlace(name: string): TokyoPlace | null {
  const n = name.trim();
  for (const p of tokyoPlaces) {
    if (n.includes(p.name)) return p;
  }
  return null;
}

function distKM(a: TokyoPlace, b: TokyoPlace): number {
  const dLat = (b.lat - a.lat) * 111;
  const dLng = (b.lng - a.lng) * 111 * Math.cos((a.lat + b.lat) / 2 * Math.PI / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

interface NearbyPoint { name: string; x: number; y: number; }

const nearbyPlaces = computed<NearbyPoint[]>(() => {
  const cur = findPlace(props.location);
  if (!cur) return [];

  const withDist = tokyoPlaces
    .filter(p => p.name !== cur.name)
    .map(p => ({ ...p, dist: distKM(cur, p) }))
    .sort((a, b) => a.dist - b.dist);

  const selected = withDist.slice(0, Math.min(7, withDist.length));

  const maxDist = selected.length > 0 ? Math.max(...selected.map(s => s.dist), 0.5) : 1;
  const scale = 85 / maxDist;

  const cx = 120, cy = 90;

  return selected.map(p => {
    const dLat = (p.lat - cur.lat) * 111;
    const dLng = (p.lng - cur.lng) * 111 * Math.cos(cur.lat * Math.PI / 180);
    return { name: p.name, x: cx + dLng * scale, y: cy - dLat * scale };
  });
});
</script>

<style lang="scss" scoped>
.location-map {
  position: relative;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}

.map-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: #fffef2;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  transition:
    width 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.15s ease-out;
  transform-style: preserve-3d;
}

.is-hovered .map-card {
  border-color: rgba(234, 179, 8, 0.3);
  box-shadow: 0 6px 24px rgba(234, 179, 8, 0.08);
}

.is-expanded .map-card {
  border-color: rgba(234, 179, 8, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.card-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.03), transparent 50%, rgba(234, 179, 8, 0.05));
}

/* ===== 地图详情 ===== */
.map-detail {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.map-base {
  position: absolute;
  inset: 0;
  background: rgba(234, 179, 8, 0.02);
}

.map-roads {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* ---- 路网动画 ---- */
.road {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

.is-expanded .road {
  animation: draw-road 1s ease-out forwards;
}

@keyframes draw-road {
  to { stroke-dashoffset: 0; }
}

/* 路网颜色 */
.r-main-h { stroke: rgba(0, 0, 0, 0.18); }
.r-main-v { stroke: rgba(0, 0, 0, 0.14); }
.r-side-h,
.r-side-v { stroke: rgba(0, 0, 0, 0.06); }

/* ---- 地点标注 ---- */
.place-dot {
  fill: rgba(0, 0, 0, 0.12);
  stroke: #fffef2;
  stroke-width: 0.5;
  opacity: 0;
}

.is-expanded .place-dot {
  animation: pop-dot 0.4s ease-out forwards;
}

.place-label {
  font-size: 8px;
  font-weight: 700;
  fill: #1c1c1e;
  opacity: 0;
  pointer-events: none;
}

.is-expanded .place-label {
  animation: fade-in 0.4s ease-out forwards;
}

@keyframes pop-dot {
  from { opacity: 0; r: 0; }
  to { opacity: 1; }
}
@keyframes fade-in { to { opacity: 1; } }

/* ---- 建筑区块 ---- */
.building {
  position: absolute;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: scale(0.8);
}

.is-expanded .building {
  animation: build-rise 0.5s ease-out forwards;
}

@keyframes build-rise {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* ---- 中心定位点 ---- */
.center-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 5;
}

.is-expanded .center-pin {
  animation: pin-spring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
}

@keyframes pin-spring {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) translateY(0);
  }
}

.pin-svg {
  filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.5));
}

.pin-inner { fill: #fffef2; }

/* ---- 底部渐变 ---- */
.map-bottom-fade {
  position: absolute;
  inset: auto 0 0 0;
  height: 30%;
  background: linear-gradient(to top, rgba(255, 254, 242, 0.7), transparent);
  pointer-events: none;
}

/* ===== 网格纹理 ===== */
.card-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 15px 15px;
  transition: opacity 0.35s;
}

/* ===== 内容 ===== */
.card-content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 20px;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.map-icon {
  transition: filter 0.3s;
}

.is-hovered .map-icon {
  filter: drop-shadow(0 0 6px rgba(234, 179, 8, 0.5));
}

.live-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #8e8e93;
  background: rgba(0, 0, 0, 0.03);
  letter-spacing: 0.8px;
  transition: all 0.2s;
}

.is-hovered .live-tag {
  background: rgba(234, 179, 8, 0.08);
  transform: scale(1.05);
}

.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #eab308;
}

.card-bottom {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.location-name {
  font-size: 18px;
  font-weight: 800;
  color: #1c1c1e;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  line-height: 1.2;
}

.is-hovered .location-name {
  transform: translateX(4px);
}

.location-weather {
  font-size: 15px;
  color: #8e8e93;
  font-weight: 600;
}

.card-underline {
  height: 2px;
  background: linear-gradient(90deg, rgba(234, 179, 8, 0.5), rgba(234, 179, 8, 0.2), transparent);
  transform-origin: left;
  transform: scaleX(0.3);
  transition: transform 0.4s ease;
}

.is-hovered .card-underline,
.is-expanded .card-underline {
  transform: scaleX(1);
}

.click-hint {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #8e8e93;
  white-space: nowrap;
  font-weight: 600;
}

/* ===== 暗色模式 ===== */
.map-dark .map-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.map-dark.is-hovered .map-card {
  border-color: rgba(234, 179, 8, 0.3);
  box-shadow: 0 6px 24px rgba(234, 179, 8, 0.12);
}

.map-dark.is-expanded .map-card {
  background: #1c1c1e;
  border-color: rgba(234, 179, 8, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.map-dark .card-bg {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.04), transparent 50%, rgba(234, 179, 8, 0.06));
}

.map-dark .map-base {
  background: rgba(234, 179, 8, 0.03);
}

.map-dark .location-name { color: #f5f5f7; }
.map-dark .location-weather { color: #98989d; }
.map-dark .click-hint { color: #98989d; }
.map-dark .live-tag { color: #98989d; background: rgba(255, 255, 255, 0.04); }
.map-dark .place-label { fill: #f5f5f7; }
.map-dark .place-dot {
  fill: rgba(255, 255, 255, 0.18);
  stroke: #2c2c2e;
}
.map-dark .pin-inner { fill: #1c1c1e; }
.map-dark .map-bottom-fade {
  background: linear-gradient(to top, rgba(28, 28, 30, 0.7), transparent);
}
.map-dark .card-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}
.map-dark .road { stroke: rgba(255, 255, 255, 0.05); }
.map-dark .r-main-h { stroke: rgba(255, 255, 255, 0.18); }
.map-dark .r-main-v { stroke: rgba(255, 255, 255, 0.14); }
.map-dark .r-side-h,
.map-dark .r-side-v { stroke: rgba(255, 255, 255, 0.06); }
.map-dark .building {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.06);
}

/* ===== 过渡动画 ===== */
.map-detail-enter-active {
  transition: opacity 0.35s ease;
}
.map-detail-leave-active {
  transition: opacity 0.2s ease;
}
.map-detail-enter-from,
.map-detail-leave-to {
  opacity: 0;
}

.map-fade-enter-active { transition: opacity 0.35s ease; }
.map-fade-leave-active { transition: opacity 0.2s ease; }
.map-fade-enter-from,
.map-fade-leave-to { opacity: 0; }

.hint-fade-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.hint-fade-leave-active {
  transition: opacity 0.15s ease;
}
.hint-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, 4px);
}
.hint-fade-leave-to {
  opacity: 0;
}
</style>
