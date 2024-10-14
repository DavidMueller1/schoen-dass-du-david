<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';

    const maxImageHeight = 300;
    const maxImageWidth = 400;

    export let image: string;
    export let isMobile: boolean;
    export let invert = false;
    export let onLoad: (event: Event) => void;

    let imageBinding: HTMLImageElement;

    const recalculateImageSize = () => {
        if (imageBinding) {
            const imageWidth = imageBinding.width;
            const imageHeight = imageBinding.height;

            if (imageHeight > maxImageHeight) {
                imageBinding.height = maxImageHeight;
                imageBinding.width = (maxImageHeight / imageHeight) * imageWidth;
            }

            if (imageWidth > maxImageWidth) {
                imageBinding.width = maxImageWidth;
                imageBinding.height = (maxImageWidth / imageWidth) * imageHeight;
            }
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
    <div class="image-mobile box-border mx-auto">
        <img on:load={onLoad} bind:this={imageBinding} src={image} alt="Project Image"/>
    </div>
{:else}
    <div class="grow basis-0 min-w-0 box-border overflow-hidden ">
        <div class="p-8 flex flex-col h-full justify-center" class:items-end={invert}>
            <img on:load={onLoad} bind:this={imageBinding} src={image} alt="Project Image"/>
        </div>
    </div>
{/if}
