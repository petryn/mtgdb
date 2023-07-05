<script setup>


</script>

<template>
    <div class="row align-items-center" id="subheader">
        <div class="col" id="title">
            <h1>
                <slot name="title"></slot>
            </h1>
        </div>
        <div class="col" id="pagination">
            <slot name="pagination"></slot>
        </div>
        <div class="col">
            <slot name="filter"></slot>
        </div>
    </div>

</template>

<style>
    #subheader {
	}    

</style>