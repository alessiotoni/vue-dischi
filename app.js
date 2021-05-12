const app = new Vue({
    el: "#app",
    data: {
        albumsList: [],
        filteredAlbumsList: [],
        filterGenre: "all",
        genreList: [],
        showLoadSpinner: true,
    },
    computed: {

    },
    methods: {
        filterAlbumsList() {
            if (this.filterGenre != "all") {
                const filteredList = this.albumsList.filter((album) => {
                    return album.genre == this.filterGenre
                });
                this.filteredAlbumsList = filteredList
            } else {
                this.filteredAlbumsList = this.albumsList
            }
        }
    },
    mounted() {
        setTimeout(() => {
            axios.get("https://flynn.boolean.careers/exercises/api/array/music")
                .then((resp) => {
                    
                    const sortedList = [];
    
                    resp.data.response.forEach((album) => {
                        sortedList.push(album);
    
                        sortedList.sort((albumA, albumB) => {
    
                            const yearA = albumA.year
                            const yearB = albumB.year
    
                            if(yearA < yearB) {
                                return -1
                            } else if (yearA > yearB) {
                                return 1
                            } else {
                                return 0
                            }
                        })
                        this.albumsList = sortedList
                    });
                    
                    this.filteredAlbumsList = this.albumsList
    
                    const genresAblums = [];
                    this.albumsList.forEach((album) => {
                        if (!genresAblums.includes(album.genre)) {
                            genresAblums.push(album.genre)
                        }
                    });
                    this.genreList = genresAblums
                })
                this.showLoadSpinner = false
        }, 2000)


    }
})