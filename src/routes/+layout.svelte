<script lang="ts">
    import "../app.css";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<div>
    <Header />
    <slot />
    <Footer />
</div>