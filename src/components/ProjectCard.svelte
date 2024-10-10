<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';

    export let projectTitle: string;
    export let projectDescription: string;

    export let currentHeight: number;

    let projectCardContainer: HTMLDivElement;

    onMount(() => {
        currentHeight = projectCardContainer.clientHeight;
        window.addEventListener('resize', () => {
            currentHeight = projectCardContainer.clientHeight;
        });
    });
</script>

<!--A test card-->
<div bind:this={projectCardContainer} class="grow basis-0 min-w-0 box-border bg-white shadow-even rounded-lg overflow-hidden">
    <div class="p-8">
        <div class="text-xl font-bold">{projectTitle}</div>
        <slot />
        <div class="mt-4">{projectDescription}</div>
    </div>
</div>