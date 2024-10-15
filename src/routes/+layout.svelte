<script lang="ts">
    import "../app.css";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<div class="dark:text-white text-black">
    <Header />
    <slot />
    <Footer />
</div>