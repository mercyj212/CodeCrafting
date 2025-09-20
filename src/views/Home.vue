<template>
  <div class="bg-[#19171b]">
    <!-- Hero Section -->
    <div
      class="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#19171b] via-[#1d1416] to-[#0f0d0e] border-b text-white px-6 overflow-hidden font-['Poppins']"
    >
      <!-- Background glows -->
      <div
        class="absolute -top-40 -left-20 w-[28rem] h-[28rem] bg-[#2b0307] rounded-full blur-[180px] opacity-50"
      ></div>
      <div
        class="absolute top-40 -right-40 w-[28rem] h-[28rem] bg-[#51080d] rounded-full blur-[180px] opacity-40"
      ></div>

      <!-- Centered Text -->
      <div class="text-center">
        <h1 class="text-[3rem] md:text-[4rem] font-bold leading-[1.1] space-y-3">
          <div>Where stories and ideas</div>

          <!-- Glassy Span -->
          <span
            class="relative inline-block px-8 py-3 italic rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Blog4U
            <!-- Light streak shine -->
            <span class="absolute inset-0 overflow-hidden rounded-lg">
              <span
                class="absolute -top-1 -left-1 w-3 h-[150%] bg-gradient-to-t from-white/60 to-transparent rotate-12 animate-shine"
              ></span>
            </span>
          </span>

          <div class="text-gray-400 font-light italic">comes alive.</div>
        </h1>
      </div>

      <!-- Image in bottom-right corner -->
      <div
        ref="card"
        class="absolute bottom-8 right-8 w-[18rem] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform-gpu transition-transform duration-300 hidden md:block"
      >
        <img
          src="../assets/aniPic.jpg"
          alt="Animated Example"
          class="w-full rounded-2xl"
        />
        <!-- Overlay gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent mix-blend-screen"
        ></div>
      </div>
    </div>

    <!-- Featured + Latest Section -->
    <section class="container max-auto px-6 py-8">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Featured Posts -->
        <div class="lg:w-2/3">
          <h2 class="text-4xl font-bold text-white mb-4">Featured Posts</h2>

          <div class="grid md:grid-cols-3 gap-6">
            <!-- Show skeletons while loading -->
            <div
              v-if="loading"
              v-for="n in 3"
              :key="'skeleton-' + n"
              class="bg-white/10 p-4 rounded-lg shadow animate-pulse"
            >
              <div class="w-full h-48 bg-gray-700 rounded mb-3"></div>
              <div class="h-5 bg-gray-600 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-600 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-600 rounded w-2/3"></div>
            </div>

            <!-- Show actual posts -->
            <router-link
              v-else
              v-for="post in featuredPosts"
              :key="post._id"
              :to="`/posts/${post._id}`"
              class="bg-white/20 p-4 rounded-lg shadow hover:shadow-lg transition block"
            >
              <img
                v-if="post.image?.url"
                :src="post.image.url"
                alt="Post image"
                class="rounded-lg mb-3 w-full h-48 object-cover"
              />
              <h3 class="text-lg font-semibold text-white mb-2">
                {{ post.title }}
              </h3>
              <p class="text-slate-300 mb-3">
                {{ post.content?.substring(0, 100) }}...
              </p>
              <div class="text-xs text-slate-400">
                By {{ post.author?.username || "Anonymous" }} •
                {{ formatDate(post.createdAt) }}
              </div>
            </router-link>
          </div>
        </div>

        <!-- Latest Posts -->
        <div class="lg:w-1/3 bg-black/40 p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold text-white mb-4">Latest Posts</h2>

          <!-- Skeleton while loading -->
          <ul v-if="loading" class="space-y-3">
            <li
              v-for="n in 5"
              :key="'latest-skel-' + n"
              class="h-5 bg-gray-700 rounded animate-pulse"
            ></li>
          </ul>

          <!-- Show latest posts with images -->
          <ul v-else class="space-y-4">
            <li
              v-for="post in latestPosts"
              :key="post._id"
              class="flex items-center gap-3"
            >
              <router-link
                :to="`/posts/${post._id}`"
                class="flex items-center gap-3 hover:text-red-700 transition"
              >
                <img
                  v-if="post.image?.url"
                  :src="post.image.url"
                  alt="Thumbnail"
                  class="w-14 h-14 object-cover rounded"
                />
                <div>
                  <h4 class="text-white font-medium">{{ post.title }}</h4>
                  <p class="text-xs text-slate-400">
                    {{ formatDate(post.createdAt) }}
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>

  <!-- Footer Section -->
<footer class="bg-white/95 text-black min-h-[50vh] flex items-center px-8 py-16">
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
    
    <!-- About -->
    <div>
      <h3 class="text-4xl font-semibold mb-4">About Blog4U</h3>
      <p class="text-lg leading-relaxed">
        Blog4U is where stories and ideas come alive. Discover articles, insights, and inspiration crafted for curious minds. 
      </p>
    </div>

    <!-- Quick Links -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
      <ul class="space-y-2 text-md">
        <li><router-link to="/" class="hover:text-red-600">Home</router-link></li>
        <li><router-link to="/about" class="hover:text-red-600">About</router-link></li>
        <li><router-link to="/posts" class="hover:text-red-600">Posts</router-link></li>
        <li><router-link to="/contact" class="hover:text-red-600">Contact</router-link></li>
      </ul>
    </div>

    <!-- Contact -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Contact</h3>
      <p class="text-sm text-gray-600">Email: support@blog4u.com</p>
      <p class="text-sm text-gray-600">Phone: +123 456 789</p>
      <div class="flex gap-4 mt-3">
        <a href="#" class="hover:text-red-600">Twitter</a>
        <a href="#" class="hover:text-red-600">Instagram</a>
        <a href="#" class="hover:text-red-600">LinkedIn</a>
      </div>
    </div>

  </div>
</footer>

</template>

<script>
import { onMounted, ref } from "vue";
import api from "../services/api";
import gsap from "gsap";

export default {
  name: "Home",
  setup() {
    const card = ref(null);

    onMounted(() => {
      // Animate heading
      gsap.from("h1 div, h1 span, h1 .text-gray-400", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power4.out",
        stagger: 0.25,
      });

      // Animate image
      gsap.from(card.value, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });

      // Tilt effect on hover
      const el = card.value;
      el.addEventListener("mousemove", (e) => {
        const { width, height, left, top } = el.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        const rotateX = (y - 0.5) * 20;
        const rotateY = (x - 0.5) * 20;
        gsap.to(el, {
          rotateX: -rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    });

    return { card };
  },

  data() {
    return {
      featuredPosts: [],
      latestPosts: [],
      loading: false,
    };
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const res = await api.get("/posts?page=1&limit=10");
        const posts = res.data.posts;

        if (posts.length > 0) {
          this.featuredPosts = posts.slice(0, 5); // First 3 featured
          this.latestPosts = posts.slice(3); // Rest are latest
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
/* Shine animation for the glassy span */
@keyframes shine {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(200%);
  }
}
.animate-shine {
  animation: shine 3s infinite;
}
</style>
