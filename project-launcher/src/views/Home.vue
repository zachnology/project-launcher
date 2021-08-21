<template>
    <div class="home container">
        <input type="text" class="form-control m-2" placeholder="Search" v-model="searchTerm"/>
        <button class="btn btn-primary m-2" v-for="project in filterProjects" v-bind:key="project" v-on:click="openProject(project)">{{ project }}</button>
    </div>
</template>

<script>
const fs = window.require('fs');
const { exec } = window.require('child_process');

export default {
  name: 'home',
  data() {
      return {
        searchTerm: '',
        projects: [],
        projectsFolder: 'C:/users/zjgom/source/repos/'
      }
  },
  computed: {
      filterProjects() {
          return this.projects.filter(p => !this.searchTerm || p.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
  },
  methods: {
      openProject(dir) {
        let path = this.projectsFolder + dir;
        exec(`code -n ${path}`, {'shell':'powershell.exe'}, ()=> {
            return 'success';
        });
      },
      getProjectList(folder) {
        return fs.readdirSync(folder, { withFileTypes: true })
            .filter(dir => dir.isDirectory())
            .map(dir => dir.name);
    }
  },
  mounted() {
      this.projects = this.getProjectList(this.projectsFolder);
  }
}
</script>