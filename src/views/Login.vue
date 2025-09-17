<template>
    <div class="relative min-h-screen flex items-center justify-center bg-[#d6d4d2] bg-cover bg-center  px-4 py-8"
        style="background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80=')"
    >

         <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <div class="relative w-full max-w-md h-[500px] rounded-2xl p-8 text-white shadow-lg bg-black/40 backdrop-blur-md ">
            <h2 class="text-xl md:text-2xl font-bold mb-6 mt-4 flex items-center justify-center">Log into your account</h2>

            <form @submit.prevent="submit"  class="space-y-6">
                <div
                    class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30"
                >
                    <img 
                        src="../assets/user.png" 
                        alt="User Icon"
                        class="w-10 h-10"
                    />

                </div>

                <div >
                    <input  v-model="email" type="text" placeholder="Username/Email" class="w-full bg-transparent border-b border-white/50 focus:outline-none py-2 placeholder-white/70 text-lg">
                    
                </div>

                 <div class="relative">
                    <input  v-model="password" type="password" placeholder="Password" class="w-full bg-transparent border-b border-white/50 focus:outline-none py-2 placeholder-white/70 text-lg">
                </div>

                <div class="flex items-center justify-between text-sm flex-wrap gap-2">
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-3 h-3 rounded">
                        <span>Remember me</span>
                    </label>

                    <router-link class="text-sm text-gray-200 hover:underline">Forgotten password?</router-link>
                </div>

                <div class="space-y-6">
                   <button
                        :disabled="loading"
                        type="submit"
                        class="w-full py-2 rounded-full bg-white hover:bg-black hover:text-white text-black font-medium mt-4 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                        <!-- Spinner -->
                        <svg
                            v-if="loading"
                            class="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            ></circle>
                            <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 
                            5.373 0 12h4zm2 5.291A7.962 7.962 0 
                            014 12H0c0 3.042 1.135 5.824 3 
                            7.938l3-2.647z"
                            ></path>
                        </svg>

                        <!-- Text -->
                        <span v-if="loading">Signing in...</span>
                        <span v-else>Sign In</span>
                    </button>


                    <p v-if="error" class="mt-4 text-center text-sm font-medium text-red-600 bg-red-50 py-2 px-4 rounded-lg">{{ error }}</p>

                    <p class="text-center text-m  mt-4 text-gray-200">
                    Don't have an account?
                    <router-link to="/register" class=" hover:bg-white/15 hover:underline px-2 py-1 rounded " >Sign Up</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api from '../services/api';
import { setToken } from '../services/auth';

    export default {
        name: "Login",

        data() {
            return {
            email: '',
            password: '',
            loading: false,
            error: '',
    }
  },
   methods: {
    async submit() {
      this.loading = true;
      this.error = '';
      this.$notify('Welcome ')
      try {
        
        // login endpoint
        const res =  await api.post('/auth/login', { email: this.email, password: this.password});
        setToken(res.data.token);
        this.$router.push({ name: 'Posts'});

       } catch (err) {
          this.error = err.response?.data?.message || 'Logging Failed';
      }finally {
        this.loading = false;
      }
    }
  }
    };
</script>

<style>
body {
margin: 0;
}
</style>