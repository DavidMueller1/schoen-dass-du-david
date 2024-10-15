<script lang="ts">
    import * as d3 from 'd3';
    import {afterUpdate, onMount} from "svelte";
    import ProfileInfo from "../components/ProfileInfo.svelte";
    import ProjectsComponent from "../components/ProjectsComponent.svelte";
    import {isDark} from "../stores/themeStore";

    const timelineWidth = 8;
    const headerHeight = 64;
    const spacingMiddle = 80;
    const verticalSpacing = 180;
    const topSpacing = 96;

    let profileInfoHeight = 0;
    let containerWidth = 0;
    let containerHeight = 0;
    let timelineLength = 0;
    let timelineScrollLength = 0;

    let isMobile = false;

    // $: profileInfoHeight && console.log(profileInfoHeight);

    // Bindings
    let containerBinding: HTMLDivElement;
	let viewBoxBinding: SVGSVGElement;
    // let timelineBinding: SVGRectElement;
    // let timelineInvertBinding: SVGRectElement;

    let timeline: d3.Selection<SVGRectElement, unknown, null, any>;
    let timelineGrey: d3.Selection<SVGRectElement, unknown, null, any>;

    let projectRowHeights: number[] = [];
    let projectImagesHeights: number[] = [];

    $: projectRowHeights && recalculateTimelineLength();
    // $: projectRowHeights && console.log(projectRowHeights);

    let currentProjectIndex = 0;

    let currentIsDark = false;

    isDark.subscribe((value) => {
        currentIsDark = value;
        // Check if DOM is loaded
        if (!timeline) return;
        createD3Elements();
    });

    const checkMobile = () => {
        isMobile = window.innerWidth < 1024;
    }

    const recalculateTimelineLength = () => {
        // currentProjectIndex = -1;
        // If the document is not loaded yet, return
        if (!containerBinding) return;

        // Get the height of all project-row-container elements in an array
        const projectRowContainers = document.querySelectorAll('.project-row-container');
        projectRowHeights = Array.from(projectRowContainers).map((container) => container.clientHeight);
        console.log("Heights:")
        console.log(projectRowHeights);

        const projectImages = document.querySelectorAll('.image-mobile');
        projectImagesHeights = Array.from(projectImages).map((image) => image.clientHeight);
        console.log(projectImagesHeights);


        if (isMobile) {
            timelineLength = projectRowHeights.slice(0, projectRowHeights.length - 1).reduce((acc, curr) => acc + curr + verticalSpacing, 0) + projectImagesHeights[projectImagesHeights.length - 1] + verticalSpacing + spacingMiddle / 2;
        } else {
            timelineLength = projectRowHeights.reduce((acc, curr) => acc + curr + verticalSpacing, 0) - projectRowHeights[projectRowHeights.length - 1] / 2;
        }
        console.log("Timeline length:")
        console.log(timelineLength);
    };

    const recalculateScrollPosition = () => {
        const lowerPadding = 160;
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;  // Get viewport height
        const topCutoff = profileInfoHeight + headerHeight + topSpacing;
        // const aimPosition = scrollY + viewportHeight - lowerPadding;
        const aimPosition = scrollY + viewportHeight * 0.66;

        if (aimPosition >= topCutoff) {
            let projectIndex = 0;
            projectRowHeights.forEach((height, index) => {
                if (aimPosition > topCutoff + projectRowHeights.slice(0, index + 1).reduce((acc, curr) => acc + curr + verticalSpacing, 0) - projectRowHeights[index] / 2) {
                    projectIndex = index + 1;
                }
            });

            if (projectIndex !== currentProjectIndex) {
                const lastProjectIndex = currentProjectIndex;
                currentProjectIndex = projectIndex;

                if (currentProjectIndex === 0) {
                    timelineScrollLength = 0;
                } else {
                    if (isMobile) {
                        timelineScrollLength = projectRowHeights.slice(0, currentProjectIndex - 1).reduce((acc, curr) => acc + curr + verticalSpacing, 0) + projectImagesHeights[currentProjectIndex - 1] + verticalSpacing + spacingMiddle / 2;
                    } else {
                        timelineScrollLength = projectRowHeights.slice(0, currentProjectIndex).reduce((acc, curr) => acc + curr + verticalSpacing, 0) - projectRowHeights[currentProjectIndex - 1] / 2;
                    }
                }

                // Animates the timeline to the new position
                timeline
                    .transition()
                    .duration(1000)
                    .attr('height', timelineScrollLength);

                // Animate circle radius
                d3.selectAll('.project-circle')
                    .transition()
                    .duration(1000)
                    .attr('r', (_, i) => i >= currentProjectIndex ? timelineWidth : timelineWidth * 2)
                    .attr('fill', (_, i) => i < currentProjectIndex ? 'rgb(6 182 212)' : (currentIsDark ? '#3b3b3b' : '#eeeeee'));
            }
        }
    }

    const createD3Elements = () => {
        const viewBox = d3.select(viewBoxBinding);
        // Remove all existing elements
        viewBox.selectAll('*').remove();

        // Create timeline
        timelineGrey = viewBox
            .append('rect')
            .attr('x', containerWidth / 2 - timelineWidth / 2)
            .attr('y', profileInfoHeight)
            .attr('width', timelineWidth)
            .attr('height', timelineLength)
            .attr('fill', currentIsDark ? '#3b3b3b' : '#eeeeee');

        timeline = viewBox
            .append('rect')
            .attr('x', containerWidth / 2 - timelineWidth / 2)
            .attr('y', profileInfoHeight)
            .attr('width', timelineWidth)
            .attr('fill', 'rgb(6 182 212)');

        // Create circles
        viewBox
            .selectAll('.project-circle')
            .data(projectRowHeights)
            .enter()
            .append('circle')
            .attr('class', 'project-circle')
            .attr('cx', containerWidth / 2)
            .attr('cy', (_, i) => isMobile ?
                profileInfoHeight + projectImagesHeights[i] + verticalSpacing + projectRowHeights.slice(0, i).reduce((acc, curr) => acc + curr + verticalSpacing, 0) + spacingMiddle / 2 :
                profileInfoHeight + projectRowHeights[i] / 2 + verticalSpacing + projectRowHeights.slice(0, i).reduce((acc, curr) => acc + curr + verticalSpacing, 0)
            )
            .attr('r', timelineWidth)
            .attr('fill', currentIsDark ? '#3b3b3b' : '#eeeeee');
    }

    const updateGraphics = () => {
        containerWidth = containerBinding.clientWidth;
        containerHeight = containerBinding.clientHeight;
        checkMobile();
        recalculateTimelineLength();
        createD3Elements();
        recalculateScrollPosition();
    }

    onMount(() => {
        updateGraphics();

        window.addEventListener("resize", () => {
            updateGraphics();
        });

        // Listen to scroll events
        window.addEventListener("scroll", recalculateScrollPosition);

        // Listen to theme change by looking for the dark class on the body
        const observer = new MutationObserver(() => {
            console.log("Theme changed");
        });
    });
</script>

<div bind:this={containerBinding} class="box-border">
    <div class="py-24 w-full absolute -z-10 dark:bg-[#121212]">
        <svg bind:this={viewBoxBinding} height={containerHeight} class="w-full">
<!--        <svg bind:this={viewBoxBinding} class="w-full h-full">-->
<!--			<g>-->
<!--                <rect-->
<!--                        bind:this={timelineInvertBinding}-->
<!--                        x={containerWidth / 2 - timelineWidth / 2}-->
<!--                        y={profileInfoHeight}-->
<!--                        width={timelineWidth}-->
<!--                        height={timelineLength}-->
<!--                        fill="#eeeeee"-->
<!--                />-->
<!--				<rect-->
<!--                        bind:this={timelineBinding}-->
<!--                        x={containerWidth / 2 - timelineWidth / 2}-->
<!--                        y={profileInfoHeight}-->
<!--                        width={timelineWidth}-->
<!--                        fill="rgb(6 182 212)"-->
<!--                />-->
<!--                {#each projectRowHeights as height, index}-->
<!--                    <circle-->
<!--                            class="project-circle"-->
<!--                            cx={containerWidth / 2}-->
<!--                            cy={isMobile ?-->
<!--                                profileInfoHeight + projectImagesHeights[index] + verticalSpacing + projectRowHeights.slice(0, index).reduce((acc, curr) => acc + curr + verticalSpacing, 0) + spacingMiddle / 2 :-->
<!--                                profileInfoHeight + height / 2 + verticalSpacing + projectRowHeights.slice(0, index).reduce((acc, curr) => acc + curr + verticalSpacing, 0)-->
<!--                            }-->
<!--                            r={timelineWidth}-->
<!--                            fill="rgb(238 238 238)"-->
<!--                    />-->
<!--                {/each}-->
<!--            </g>-->
        </svg>
    </div>
    <div class="py-24 relative">
        <ProfileInfo bind:currentHeight={profileInfoHeight} />
        <ProjectsComponent
            isMobile={isMobile}
            spacingMiddle={spacingMiddle}
            verticalSpacing={verticalSpacing}
            allImagesLoaded={() => updateGraphics()}
        />
    </div>
</div>