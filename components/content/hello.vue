<template>
  <div
    class="w-full mx-auto flex gap-4 bg-zinc-950 p-6 rounded-xl border border-zinc-900"
  >
    <Avatar>
      <AvatarImage src="/blogs/james.jpg" alt="@radix-vue" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <p class="m-0">
      <span class="text-3xl text-zinc-600">“</span>Hello, my name is James, and I like to
      ramble on about code, design, and building products. If that is
      interesting to you, you can subscribe
      <a @click="scrollToSubscribe()" class="hover:cursor-pointer">here</a>
      to receive these blogs directly to your mailbox.<span class="text-3xl text-zinc-600"
        >”</span
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
function scrollToSubscribe() {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Signup form not found");
  }
}
</script>
