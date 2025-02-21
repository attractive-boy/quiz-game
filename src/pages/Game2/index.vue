<template>
    <div class="game-select">
        <div class="game2-back">
            <div class="game2">
            </div>
            <div class="submit"></div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Game2',
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
    }
}
</script>


<style scoped>
.game-select {
    width: 100%;
    height: 100vh;
    background: url("../../assets/selectpage_background.png") no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
.game2{
  background: url("../../assets/selectpage_background.png") no-repeat center center;
  background-size: cover;
}

</style>
