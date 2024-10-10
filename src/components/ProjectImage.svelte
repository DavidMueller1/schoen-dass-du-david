<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from 'd3';

    const maxImageHeight = 300;
    const maxImageWidth = 400;

    export let image: string;

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
</script>

<!--A test card-->
<div class="grow basis-0 min-w-0 box-border overflow-hidden ">
    <div class="p-8 flex flex-row justify-end">
        <img bind:this={imageBinding} src={image} alt="Project Image"/>
    </div>
</div>