<script lang="ts">
    import { onMount } from "svelte";
    import ProfileInfo from "../components/ProfileInfo.svelte";
    import ProjectsComponent from "../components/ProjectsComponent.svelte";

    const timelineWidth = 8;

    let profileInfoHeight = 0;
    let containerWidth = 0;
    let containerHeight = 0;
    let timelineLength = 0;

    $: profileInfoHeight && console.log(profileInfoHeight);

    // Bindings
    let containerBinding: HTMLDivElement;
	let viewBoxBinding: SVGSVGElement;

    const recalculateTimelineLength = () => {
        timelineLength = containerHeight - profileInfoHeight - 96 * 2;
    };

    onMount(() => {
        containerWidth = containerBinding.clientWidth;
        containerHeight = containerBinding.clientHeight;
        recalculateTimelineLength();
        window.addEventListener("resize", () => {
            containerWidth = containerBinding.clientWidth;
            containerHeight = containerBinding.clientHeight;
            recalculateTimelineLength();
        });
    });
</script>

<div bind:this={containerBinding} class="py-24">
    <div class="w-full absolute -z-10">
        <svg bind:this={viewBoxBinding} height={containerHeight - 96 * 2} class="w-full">
			<g>
				<rect
                        x={containerWidth / 2 - timelineWidth / 2}
                        y={profileInfoHeight}
                        width={timelineWidth}
                        height={timelineLength}
                        fill="rgb(6 182 212"
                />
			</g>
<!--			<g bind:this={xAxisGridBinding} transform="translate(0,{height})" />-->
<!--			<g bind:this={yAxisBinding} class="text-lg" transform="translate({marginLeft},0)" />-->
<!--			<g fill="none">-->
<!--				{#each data as entry, index}-->
<!--					{#if entry.connectionStatus === ConnectionStatus.CONNECTED}-->
<!--&lt;!&ndash;						<clipPath id="clip">&ndash;&gt;-->
<!--&lt;!&ndash;							<rect x={marginLeft} y={0} width={width - marginLeft - marginRight} height={height} />&ndash;&gt;-->
<!--&lt;!&ndash;						</clipPath>&ndash;&gt;-->
<!--						<rect-->
<!--							x={x(entry.timestampStart)}-->
<!--							y={marginTop}-->
<!--							width={x(entry.timestampEnd) - x(entry.timestampStart)}-->
<!--							height={height - marginBottom - marginTop}-->
<!--							fill={attributeMapping.find(mapping => mapping.attributeValue === entry.attributeVal)?.color}-->
<!--							use:popup={popupDetailList[index]}-->
<!--						/>-->
<!--&lt;!&ndash;						<use href="#chart-rect-{index}" clip-path="url(#clip)" stroke="#3c8eae" stroke-width="4" />&ndash;&gt;-->
<!--					{/if}-->
<!--				{/each}-->
<!--			</g>-->
        </svg>
    </div>
    <div class="relative">
        <ProfileInfo bind:currentHeight={profileInfoHeight} />
        <ProjectsComponent spacingMiddle={80} />
    </div>
</div>