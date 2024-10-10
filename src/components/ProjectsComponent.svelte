<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import ProjectCard from "./ProjectCard.svelte";
    import ProjectRow from "./ProjectRow.svelte";

    import privacyHubImage from '$lib/assets/images/privacy_hub.png';

    export let spacingMiddle = 80;

    onMount(() => {
        // set width of elements with class middle-spacer to the value of spacingMiddle
        d3.selectAll('.middle-spacer').style('width', `${spacingMiddle}px`);
    });
</script>

<div class="max-w-[1240px] mx-auto">
    <ProjectRow
        projectTitle="PrivacyHub"
        projectDescription="
            This is a test project. It is used totest the ProjectCard component.<br>Test
        "
        image={privacyHubImage}
        spacingMiddle={spacingMiddle}
        invert={true}
    />
    <ProjectRow
        projectTitle="PrivacyHub"
        projectDescription="
            This is a test project. It is used totest the ProjectCard component.<br>Test
        "
        image={privacyHubImage}
        spacingMiddle={spacingMiddle}
        invert={false}
    />
</div>