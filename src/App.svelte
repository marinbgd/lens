<script>
  import svelteLogo from './assets/svelte.svg'
  import AddLens from './components/AddLens.svelte'
  import LensList from './components/LensList.svelte'
  import ExportDb from './components/ExportDb.svelte';
  import ImportDb from './components/ImportDb.svelte';
</script>

<main>
  <div>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Lens DB</h1>

  <AddLens />
  <LensList />

  <ExportDb />
  <ImportDb />

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
