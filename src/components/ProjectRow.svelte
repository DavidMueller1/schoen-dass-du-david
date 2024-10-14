<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import ProjectCard from "./ProjectCard.svelte";
    import ProjectImage from "./ProjectImage.svelte";

    export let projectTitle: string;
    export let projectSubtitle = '';
    export let image: string;
    export let spacingMiddle: number;
    export let invert = false;
    export let isMobile: boolean;
    export let onLoad: (event: Event) => void;

    // export let currentHeight = 0;

    onMount(() => {
        // d3.selectAll('.middle-spacer').style('width', `${spacingMiddle}px`);
    });
</script>

{#if isMobile}
    <div class="project-row-container box-border flex flex-col w-full mt-24 px-8">
        <ProjectImage
                image={image}
                isMobile={isMobile}
                onLoad={onLoad}
        />
        <div class="middle-spacer" style="height: {spacingMiddle}px"></div>
        <ProjectCard
                projectTitle={projectTitle}
                projectSubtitle={projectSubtitle}
                isMobile={isMobile}
        >
            <slot />
        </ProjectCard>
    </div>
{:else}
    <div class="project-row-container box-border flex w-full mt-24 px-8">
        {#if invert}
            <ProjectImage
                    image={image}
                    isMobile={isMobile}
                    invert={true}
                    onLoad={onLoad}
            />
            <div class="middle-spacer" style="width: {spacingMiddle}px"></div>
            <ProjectCard
                    projectTitle={projectTitle}
                    projectSubtitle={projectSubtitle}
                    isMobile={isMobile}
            >
                <slot />
            </ProjectCard>
        {:else}
            <ProjectCard
                    projectTitle={projectTitle}
                    projectSubtitle={projectSubtitle}
                    isMobile={isMobile}
            >
                <slot />
            </ProjectCard>
            <div class="middle-spacer" style="width: {spacingMiddle}px"></div>
            <ProjectImage
                    image={image}
                    isMobile={isMobile}
                    invert={false}
                    onLoad={onLoad}
            />
        {/if}
    </div>
{/if}
