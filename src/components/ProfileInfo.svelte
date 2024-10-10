<script lang="ts">
    import { onMount } from 'svelte';

    import profilePictureRound from '$lib/assets/images/profile_picture_round.png';
    import github from '$lib/assets/images/github.png';
    import linkedin from '$lib/assets/images/linkedin.png';
    import Socials from "./Socials.svelte";

    export let currentHeight: number;

    let profileInfoContainer: HTMLDivElement;

    // update height on mount and resize
    onMount(() => {
        currentHeight = profileInfoContainer.clientHeight;
        window.addEventListener('resize', () => {
            currentHeight = profileInfoContainer.clientHeight;
        });
    });
</script>

<div bind:this={profileInfoContainer} class="max-w-[1000px] mx-auto px-8">
    <div class="p-8 shadow-even rounded-2xl">
        <img class="mx-auto" src="{profilePictureRound}" alt="Profile Picture" width="200"/>
        <div class="text-center text-2xl font-bold mt-8 text-cyan-500">
            Hi, I'm David 👋
        </div>
        <div class="mt-4">
            I recently completed my Master's degree in Media Informatics, a multidisciplinary field combining computer science, design, and user interaction. My passion lies in developing innovative software and hardware prototypes. I have experience in web development (front- and backend), mobile development (Android and Flutter), developing desktop applications, hardware prototyping, and some design skills.
            <br><br>
            This website is a showcase of my recent <b>projects</b> and <b>experiments</b>. Feel free to explore and get in touch if you have any questions or feedback.
        </div>
        <Socials />
    </div>
</div>