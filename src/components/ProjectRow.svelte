<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import ProjectCard from "./ProjectCard.svelte";
    import ProjectImage from "./ProjectImage.svelte";

    export let projectTitle: string;
    export let projectDescription: string;
    export let image: string;
    export let spacingMiddle: number;
    export let invert = false;

    export let currentHeight = 0;

    onMount(() => {
        d3.selectAll('.middle-spacer').style('width', `${spacingMiddle}px`);
    });
</script>

<div class="project-row-container flex w-full mt-24">
    {#if invert}
        <ProjectImage
                image={image}
        />
        <div class="middle-spacer"></div>
        <ProjectCard
                projectTitle={projectTitle}
                projectDescription={projectDescription}
                currentHeight={0}
        />
    {:else}
        <ProjectCard
                projectTitle={projectTitle}
                projectDescription={projectDescription}
                currentHeight={0}
        />
        <div class="middle-spacer"></div>
        <ProjectImage
                image={image}
        />
    {/if}
</div>