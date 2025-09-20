<template>
  <div class="relative min-h-screen">
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#19171b] to-[#51080d] -z-10"></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)] -z-10"
    ></div>

    <!-- Hero Header -->
    <div
      class="w-full bg-gradient-to-r from-[#19171b] to-[#2b0307] backdrop-blur-md border-red-900/40"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-4xl font-bold text-white/50">Latest Posts</h1>
        <p class="text-slate-300 mt-2">
          Discover insights, stories, and ideas from our community
        </p>
      </div>
    </div>

    <!-- Page Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full">
      <!-- Loading state -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mb-4"
          ></div>
          <p class="text-slate-300 font-medium">Loading amazing content...</p>
        </div>
      </div>

      <!-- Posts Grid -->
      <div
        v-else
        class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <article
          v-for="post in posts"
          :key="post._id"
          class="group grid grid-cols-1 md:grid-cols-2 bg-black/80 backdrop-blur-md 
                 rounded-2xl shadow-lg border border-red-900/30 hover:border-red-600/50 
                 transition-all duration-300 overflow-hidden hover:-translate-y-1"
        >
          <!-- Left Side: Image (hidden on mobile) -->
          <div class="relative overflow-hidden hidden md:block">
            <img
              v-if="post.image?.url"
              :src="post.image.url"
              class="w-60 h-64 object-cover md:w-full md:h-full group-hover:scale-105 transition-transform duration-500"
              :alt="post.title"
            />

            <div
              v-else
              class="w-full h-64 md:h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <!-- Right Side: Content -->
          <div class="p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <div
                  class="w-8 h-8 rounded-full bg-gradient-to-br from-black to-red-600 flex items-center justify-center"
                >
                  <span class="text-white text-sm font-bold">
                    {{ post.author?.username?.charAt(0)?.toUpperCase() || 'A' }}
                  </span>
                </div>
                <div class="text-sm text-slate-300">
                  {{ post.author?.username || 'Anonymous' }} •
                  {{ formatDate(post.createdAt) }}
                </div>
              </div>

              <h2
                class="font-semibold text-xl text-white mb-3 group-hover:text-red-500 transition-colors line-clamp-2"
              >
                {{ post.title }}
              </h2>

              <p class="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {{ post.content.substring(0, 120) }}...
              </p>

              <!-- Tags -->
              <div
                v-if="post.tags && post.tags.length"
                class="flex flex-wrap gap-2 mb-4"
              >
                <span
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-1 text-xs font-medium bg-red-900/30 text-red-200 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Footer actions -->
            <div
              class="flex items-center justify-between pt-4 border-t border-slate-700"
            >
              <router-link
                :to="{ name: 'PostDetails', params: { id: post._id } }"
                class="inline-flex items-center gap-2 text-slate-300 hover:text-red-400 font-medium text-sm group/link"
              >
                <span>Read More</span>
                <svg
                  class="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && posts.length === 0"
        class="text-center py-20 text-slate-300"
      >
        <div
          class="mx-auto w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6"
        >
          <svg
            class="w-12 h-12 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h3 class="text-xl font-semibold text-white mb-2">No posts yet</h3>
        <p class="text-slate-400 mb-6">
          Be the first to share your thoughts with the community!
        </p>
        <router-link
          to="/posts/create"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create First Post
        </router-link>
      </div>
    </div>
  </div>

  <!-- Footer Section -->
  <footer class="bg-white/95 text-black min-h-[50vh] flex items-center px-8 py-16">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      <!-- About -->
      <div>
        <h3 class="text-4xl font-semibold mb-4">About Blog4U</h3>
        <p class="text-lg leading-relaxed">
          Blog4U is where stories and ideas come alive. Discover articles,
          insights, and inspiration crafted for curious minds.
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
import api from "../services/api";
import { auth } from "../services/auth";

export default {
  data() {
    return {
      posts: [],
      loading: false,
    };
  },
  computed: {
    currentUser() {
      return auth.user;
    },
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const res = await api.get("/posts?page=1&limit=20");
        this.posts = res.data.posts;
      } catch (err) {
        console.error("Error Fetching posts:", err);
      } finally {
        this.loading = false;
      }
    },
    isOwner(post) {
      return post.author && auth.user && post.author._id === auth.user.id;
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
