<script lang="ts">
    import { onMount } from 'svelte';

    import profilePictureRound from '$lib/assets/images/profile_picture_round.png';
    import github from '$lib/assets/images/github.png';
    import linkedin from '$lib/assets/images/linkedin.png';

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

<div bind:this={profileInfoContainer} class="max-w-[940px] mx-auto p-8 shadow-even rounded-2xl">
    <img class="mx-auto" src="{profilePictureRound}" alt="Profile Picture" width="200"/>
    <div class="text-center text-2xl font-bold mt-8 text-cyan-500">
        Hi, I'm David 👋
    </div>
    <div class="mt-4">
        I recently completed my Master's degree in Media Informatics, a multidisciplinary field combining computer science, design, and user interaction. My passion lies in developing innovative software and hardware prototypes. I have experience in web development (front- and backend), mobile development (Android and Flutter), developing desktop applications, hardware prototyping, and some design skills.
        <br><br>
        This website is a showcase of my recent projects and experiments. Feel free to explore and get in touch if you have any questions or feedback.
    </div>
<!--    LinkedIn icon with link-->
    <div class="flex justify-end space-x-2">
        <a href="https://www.linkedin.com/in/muellerda/" target="_blank">
            <img src={linkedin} alt="LinkedIn" class="w-8 h-8"/>
        </a>
<!--        Github link-->
        <a href="https://github.com/DavidMueller1" target="_blank">
            <img src={github} alt="GitHub" class="w-8 h-8"/>
        </a>
    </div>
</div>