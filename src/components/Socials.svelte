<script lang="ts">
    import linkedin from "$lib/assets/images/linkedin.png";
    import github from "$lib/assets/images/github.png";

    export let light = false;
</script>

<style>
    .invert {
        filter: invert(1);
    }
</style>

<div class="flex justify-end space-x-2">
    <!-- LinkedIn  -->
    <a href="https://www.linkedin.com/in/muellerda/" target="_blank">
        <img src={linkedin} alt="LinkedIn" class="w-8 h-8"/>
    </a>
    <!-- Github -->
    <a href="https://github.com/DavidMueller1" target="_blank">
        <img class:invert={light} src={github} alt="GitHub" class="w-8 h-8"/>
    </a>
</div>