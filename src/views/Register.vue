<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style="background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80')"
  >
    <!-- bg overlay -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    <!-- Glass card -->
    <div
      class="relative flex flex-col md:flex-row w-[95%] max-w-4xl min-h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md"
    >
      <!-- Left side (image + text, hidden on small screens) -->
      <div
        class="hidden md:flex w-1/2 bg-cover bg-center flex-col justify-end text-white p-8"
        style="background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80')"
      >
        <h2 class="text-2xl font-bold mb-2">Don’t have an account?</h2>
        <p class="text-sm text-gray-200">
          Register to access all the features of our service.  
          Manage your everything in one place. It’s free!
        </p>
      </div>

      <!-- Right side (form) -->
      <div class="w-full md:w-1/2 bg-black/40 flex flex-col justify-center p-10 text-white">
        <h2 class="text-2xl font-bold mb-6">Sign up</h2>

        <form @submit.prevent="submit" class="space-y-4">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            class="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 placeholder-gray-300 text-md"
          />

          <input
            type="text"
            v-model="username"
            placeholder="Username"
            class="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 placeholder-gray-300 text-md"
          />

          <div class="relative">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 placeholder-gray-300 text-md"
            />
          </div>

          <!-- Checkbox -->
          <label class="flex items-center text-sm text-gray-300 space-x-2">
            <input type="checkbox" v-model="agree" class="w-3 h-3" />
            <span>
              I agree with
              <a href="#" class="underline hover:text-purple-400">Privacy policy</a>
            </span>
          </label>

          <!-- Button -->
          <button
            :disabled="loading || !agree"
            type="submit"
            class="w-full py-2 rounded-full bg-white hover:bg-black hover:text-white text-black font-medium mt-4
                   disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <!-- Spinner -->
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0
                  0 5.373 0 12h4zm2 5.291A7.962
                  7.962 0 014 12H0c0 3.042 1.135
                  5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            <span v-if="loading">Signing up...</span>
            <span v-else>Sign Up</span>
          </button>

          <!-- Error -->
          <p
            v-if="error"
            class="mt-4 text-center text-sm font-medium text-red-600 bg-red-50 py-2 px-4 rounded-lg"
          >
            {{ error }}
          </p>
        </form>

        <p class="text-md mt-6 text-gray-300">
          Have an account?
          <router-link
            to="/login"
            class="hover:underline hover:bg-white/15 px-1 py-1 rounded"
          >Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import { setToken } from "../services/auth";

export default {
  name: "Register",

  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
      error: "",
      agree: false, // checkbox state
    };
  },
  methods: {
    async submit() {
      if (!this.agree) {
        this.error = "You must agree to the Privacy policy.";
        return;
      }

      this.loading = true;
      this.error = "";
      this.$notify("Welcome ");
      try {
        // register endpoint
        await api.post("/auth/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        // login right after registration because register doesn’t return token
        const res = await api.post("/auth/login", {
          email: this.email,
          password: this.password,
        });
        setToken(res.data.token);
        this.$router.push({ name: "Posts" });
      } catch (err) {
        this.error = err.response?.data?.message || "Signing Up Failed";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* No extra CSS – Tailwind handles responsiveness */
</style>
