<script lang="ts">
    import Socials from "./Socials.svelte";
</script>

<div class="bg-gray-700 dark:bg-[#343434] text-white py-16">
    <div class="max-w-[800px] mx-auto px-8 text-white text-center">
<!--        <div class="text-xl font-bold">🚧 This site is currently under construction</div>-->
        <div class="text-xl font-bold">💼 I am currently open for job opportunities</div>
        <div class="mt-2">If you feel like I could be a good fit for your team, feel free to reach out to me.</div>
        <div class="bg-white my-8 h-[1px]"></div>
        <div class="flex justify-between">
            <div class="text-lg">Connect with me:</div>
            <Socials light={true} />
        </div>

    </div>
</div>