<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    import ProjectCard from "./ProjectCard.svelte";
    import ProjectRow from "./ProjectRow.svelte";

    import privacyHubImage from '$lib/assets/images/privacy_hub.png';
    import ProjectImage from "./ProjectImage.svelte";

    export let isMobile: boolean;
    export let spacingMiddle = 80;
    export let allImagesLoaded: () => void;

    let waiting = 2;

    const onLoad = (event: Event) => {
        console.log('loaded one img');
        waiting--;
        if (waiting === 0) {
            allImagesLoaded();
        }
    };

    onMount(() => {
        // set width of elements with class middle-spacer to the value of spacingMiddle
        d3.selectAll('.middle-spacer').style('width', `${spacingMiddle}px`);
    });
</script>

<div class="max-w-[1240px] mx-auto">
    <ProjectRow
        projectTitle="PrivacyHub"
        projectSubtitle="Master's Thesis"
        image={privacyHubImage}
        spacingMiddle={spacingMiddle}
        invert={true}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">
            Over the last few years, the usage of smart home systems has grown continuously, enhancing convenience and comfort in many households.
            However, recent research shows that smart devices bear the risk of exposing intimate data of the residents and most users are not equipped with the necessary knowledge or tools to monitor and manage privacy settings of their devices.
            <br><br>
            To address this issue, I developed PrivacyHub, a privacy-centered hub that allows users to switch between three different privacy modes: <span class="text-[#70b853]">Local</span>, <span class="text-[#f2a641]">Online</span>, and <span class="text-[#e05c49]">Online-Shared</span>.
            The Hub is designed to support commercial smart devices that implement the <a href="https://csa-iot.org/all-solutions/matter/" target="_blank">Matter standard</a>.
            For a detailed explanation and evaluation of the system, please refer to my master's thesis: <a href="https://drive.google.com/file/d/1qS-S8zFgc5B6aB6hSXEOV53u1T_wDUVO/view?usp=drive_link" target="_blank">Development and Evaluation of a Smart Home Privacy Hub</a>.
        </div>
    </ProjectRow>
    <ProjectRow
        projectTitle="PrivacyHub"
        image={privacyHubImage}
        spacingMiddle={spacingMiddle}
        invert={false}
        isMobile={isMobile}
        onLoad={onLoad}
    >
        <div class="mt-4">This is a test project. It is used to test the ProjectCard component.<br>Test</div>
    </ProjectRow>
</div>