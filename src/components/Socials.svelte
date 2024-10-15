<script lang="ts">
    import linkedin from "$lib/assets/images/linkedin.png";
    import github from "$lib/assets/images/github.png";
    import {isDark} from "../stores/themeStore";
    import Fa from "svelte-fa";
    import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

    export let light = false;

    let realLight = light;

    isDark.subscribe((value) => {
        if (value) {
            realLight = true;
        } else {
            realLight = light;
        }
    });
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
        <img class:invert={realLight} src={github} alt="GitHub" class="w-8 h-8"/>
    </a>
    <!-- Mail -->
    <a href="mailto:david.muelle2@web.de" target="_blank">
        <Fa icon={faEnvelope} size="2.1x" class="h-8 {realLight ? 'text-white' : 'text-black'}"/>
    </a>
</div>