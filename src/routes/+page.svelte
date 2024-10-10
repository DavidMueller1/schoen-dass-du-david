<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from "svelte";
    import ProfileInfo from "../components/ProfileInfo.svelte";
    import ProjectsComponent from "../components/ProjectsComponent.svelte";

    const timelineWidth = 8;
    const headerHeight = 64;

    let profileInfoHeight = 0;
    let containerWidth = 0;
    let containerHeight = 0;
    let timelineLength = 0;
    let timelineScrollLength = 0;

    $: profileInfoHeight && console.log(profileInfoHeight);

    // Bindings
    let containerBinding: HTMLDivElement;
	let viewBoxBinding: SVGSVGElement;
    let timelineBinding: SVGRectElement;

    let projectRowHeights: number[] = [];

    const recalculateTimelineLength = () => {

        // Get the height of all project-row-container elements in an array
        const projectRowContainers = document.querySelectorAll('.project-row-container');
        projectRowHeights = Array.from(projectRowContainers).map((container) => container.clientHeight);

        timelineLength = projectRowHeights.reduce((acc, curr) => acc + curr + 96, 0) - projectRowHeights[projectRowHeights.length - 1] / 2;
    };

    let currentProjectIndex = 0;

    const recalculateScrollPosition = () => {
        const lowerPadding = 110;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;  // Get viewport height
            const topCutoff = profileInfoHeight + headerHeight + 96;
            const aimPosition = scrollY + viewportHeight - lowerPadding;

            if (aimPosition < topCutoff) {
                scrollProgress = 0;
            } else {
                let projectIndex = 0;
                projectRowHeights.forEach((height, index) => {
                    if (aimPosition > topCutoff + projectRowHeights.slice(0, index + 1).reduce((acc, curr) => acc + curr + 96, 0) - projectRowHeights[index] / 2) {
                        projectIndex = index + 1;
                    }
                });

                if (projectIndex !== currentProjectIndex) {
                    currentProjectIndex = projectIndex;
                    console.log(currentProjectIndex);

                    if (currentProjectIndex === 0) {
                        timelineScrollLength = 0;
                    } else {
                        timelineScrollLength = projectRowHeights.slice(0, currentProjectIndex).reduce((acc, curr) => acc + curr + 96, 0) - projectRowHeights[currentProjectIndex - 1] / 2;
                    }

                    console.log(timelineScrollLength);

                    // Animates the timeline to the new position
                    d3.select(timelineBinding)
                        .transition()
                        .duration(1000)
                        .attr('height', timelineScrollLength);
                }
            }
    }

    onMount(() => {
        containerWidth = containerBinding.clientWidth;
        containerHeight = containerBinding.clientHeight;
        recalculateTimelineLength();
        recalculateScrollPosition();
        window.addEventListener("resize", () => {
            containerWidth = containerBinding.clientWidth;
            containerHeight = containerBinding.clientHeight;
            recalculateTimelineLength();
        });

        // Listen to scroll events
        window.addEventListener("scroll", recalculateScrollPosition);
    });
</script>

<div bind:this={containerBinding} class="py-24">
    <div class="w-full absolute -z-10">
        <svg bind:this={viewBoxBinding} height={containerHeight - 96 * 2} class="w-full">
			<g>
				<rect
                        bind:this={timelineBinding}
                        x={containerWidth / 2 - timelineWidth / 2}
                        y={profileInfoHeight}
                        width={timelineWidth}
                        fill="rgb(6 182 212)"
                />
			</g>
            <g>
                {#each projectRowHeights as height, index}
                    <circle
                        cx={containerWidth / 2}
                        cy={profileInfoHeight + height / 2 + 96 + projectRowHeights.slice(0, index).reduce((acc, curr) => acc + curr + 96, 0)}
                        r={timelineWidth * 2}
                        fill="rgb(6 182 212)"
                    />
                {/each}
            </g>
        </svg>
    </div>
    <div class="relative">
        <ProfileInfo bind:currentHeight={profileInfoHeight} />
        <ProjectsComponent spacingMiddle={80} />
    </div>
</div>