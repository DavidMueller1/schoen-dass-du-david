<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';

    const maxImageHeight = 300;
    const maxImageWidth = 400;

    export let content: string;
    export let isMobile: boolean;
    export let invert = false;
    export let isVideo = false;
    export let onLoad: (event: Event) => void;

    let imageBinding: HTMLImageElement;
    let iframeBinding: HTMLIFrameElement;

    const recalculateImageSize = () => {
        if (imageBinding) {
            // const imageWidth = imageBinding.width;
            // const imageHeight = imageBinding.height;
            //
            // if (imageHeight > maxImageHeight) {
            //     imageBinding.height = maxImageHeight;
            //     imageBinding.width = (maxImageHeight / imageHeight) * imageWidth;
            // }
            //
            // if (imageWidth > maxImageWidth) {
            //     imageBinding.width = maxImageWidth;
            //     imageBinding.height = (maxImageWidth / imageWidth) * imageHeight;
            // }
        }
        if (iframeBinding) {
            if (isVideo) {
                // Recalculate height to keep aspect ratio
                console.log('Recalculating height');
                console.log(iframeBinding.width);
                console.log(iframeBinding.height);
                iframeBinding.height = ((Number(iframeBinding.width) / 16) * 9).toString();
                console.log(iframeBinding.height);
            }
            // iframeBinding.width = maxImageWidth.toString();
            // iframeBinding.height = maxImageHeight.toString();
        }
    };



    onMount(() => {
        recalculateImageSize();
        window.addEventListener('resize', () => {
            recalculateImageSize();
        });
    });

    // let waiting = 0
    // const onload = (el: HTMLElement) => {
    //     waiting++
    //     el.addEventListener('load', () => {
    //         waiting--
    //         if (waiting === 0) {
    //             console.log('all images loaded')
    //         }
    //     })
    // }
</script>

{#if isMobile}
    <div class="image-mobile box-border mx-auto relative overflow-hidden" class:w-full={isVideo} class:pt-[56.25%]={isVideo}>
        {#if isVideo}
            <iframe on:load={onLoad} bind:this={iframeBinding} class="absolute top-0 left-0 bottom-0 right-0 w-full h-full border-none rounded-lg" src={content} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        {:else}
            <img on:load={onLoad} bind:this={imageBinding} class="rounded-lg" src={content} alt="Project Image"/>
        {/if}
    </div>
{:else}
    <div class="grow basis-0 min-w-0 box-border overflow-hidden flex flex-col justify-center">
        <div class="flex flex-col justify-center relative" class:items-end={invert} class:w-full={isVideo} class:pt-[56.25%]={isVideo}>
            {#if isVideo}
                <iframe on:load={onLoad} bind:this={iframeBinding} class="absolute top-0 left-0 bottom-0 right-0 w-full h-full border-none rounded-lg" src={content} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            {:else}
                <img on:load={onLoad} bind:this={imageBinding} class="rounded-lg" src={content} alt="Project Image"/>
            {/if}
        </div>
    </div>
{/if}
