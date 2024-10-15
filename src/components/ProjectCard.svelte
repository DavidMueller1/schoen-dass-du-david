<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';

    export let projectTitle: string;
    export let projectSubtitle = '';
    // export let projectDescription: string;
    export let isMobile: boolean;

    onMount(() => {
        // currentHeight = projectCardContainer.clientHeight;
        // window.addEventListener('resize', () => {
        //     currentHeight = projectCardContainer.clientHeight;
        // });
    });
</script>

{#if isMobile}
<!--    <div class="grow basis-0 w-full box-border bg-white shadow-even rounded-lg overflow-hidden">-->
    <div class="box-border bg-white shadow-even rounded-lg dark:bg-[#1f1f1f]">
        <div class="p-8">
            <div class="text-xl font-bold">{projectTitle}</div>
            {#if projectSubtitle}
                <div class="text-lg font-semibold text-gray-500">{projectSubtitle}</div>
            {/if}
            <slot />
<!--            <div class="mt-4">{@html projectDescription}</div>-->
        </div>
    </div>
{:else}
    <div class="grow basis-0 min-w-0 box-border bg-white shadow-even rounded-lg overflow-hidden dark:bg-[#1f1f1f]">
        <div class="p-8">
            <div class="text-xl font-bold">{projectTitle}</div>
            {#if projectSubtitle}
                <div class="text-lg text-gray-500">{projectSubtitle}</div>
            {/if}
            <slot />
<!--            <div class="mt-4">{@html projectDescription}</div>-->
        </div>
    </div>
{/if}
