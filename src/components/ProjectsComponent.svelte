<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import ProjectCard from "./ProjectCard.svelte";

    export let spacingMiddle = 40;

    onMount(() => {
        // set width of elements with class middle-spacer to the value of spacingMiddle
        d3.selectAll('.middle-spacer').style('width', `${spacingMiddle}px`);
    });
</script>

<div class="max-w-[1240px] mx-auto mt-24">
    <div class="flex w-full">
        <div class="bg-blue-600 grow basis-0 min-w-0 box-border">TEST 1</div>
        <div class="middle-spacer"></div>
        <ProjectCard
                projectTitle="Test Project"
                projectDescription="This is a test project. It is used to test the ProjectCard component."
                currentHeight={0}
        />
    </div>
</div>