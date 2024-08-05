<script setup>



const types = [
    "mexican",
    "indian",
    "italian",
    "american",
    "japanese",
    "thai",
    "french",
    "chinese",
    "greek",
    "brazilian",
    "spanish",
    "vietnamese",
    "korean",
    "african",
    "caribbean",
    "cuban",
    "barbeque",
    "other"
]
</script>


<template>
<form class="container-fluid">
    <section class="row">
        <div class="mb-3">
        <label for="restaurantName" class="form-label">Restaurant Name</label>
        <input type="text" class="form-control" id="restaurant-name">
        </div>
        <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" placeholder="Add your restaurant's description here..." id="description"></textarea>
        </div>
        <div class="mb-3">
        <label for="primaryPictureURL" class="form-label">Restaurant's Primary Picture</label>
        <input type="text" class="form-control" id="restaurant-primary-picture">
        </div>
        <div class="mb-3">
        <label for="breakfastPictureURL" class="form-label">Restaurant's Breakfast Picture</label>
        <input type="text" class="form-control" id="restaurant-breakfast-picture">
        </div>
        <div class="mb-3">
        <label for="location" class="form-label">Restaurant's Location</label>
        <input type="text" class="form-control" id="location">
        </div>
        <section>
            <div>
                <input type="checkbox" class="form-check-input" id="sunday">
                <label class="form-check-label" for="hours">Sunday</label>
                <input type="time" id="sunday" name="sunday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="monday">
                <label class="form-check-label" for="hours">Monday</label>
                <input type="time" id="monday" name="Monday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="tuesday">
                <label class="form-check-label" for="hours">Tuesday</label>
                <input type="time" id="tuesday" name="tuesday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="wednesday">
                <label class="form-check-label" for="hours">Wednesday</label>
                <input type="time" id="wednesday" name="wednesday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="thursday">
                <label class="form-check-label" for="hours">Thursday</label>
                <input type="time" id="thursday" name="thursday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="friday">
                <label class="form-check-label" for="hours">Friday</label>
                <input type="time" id="friday" name="friday" min="0:00" max="23:59"/>
            </div>
            <div>
                <input type="checkbox" class="form-check-input" id="saturday">
                <label class="form-check-label" for="hours">Saturday</label>
                <input type="time" id="saturday" name="saturday" min="0:00" max="23:59"/>
            </div>
        </section>
        <div>
            <select class="form-select text-capitalize" name="type" id="type">
                <option v-for="type in types" :key="type" :value="type">
                {{ type }}
                </option>
            </select>
        </div>
        <div class="mb-3">
        <label for="logoURL" class="form-label">Restaurant Logo</label>
        <input type="text" class="form-control" id="logo">
        </div>
        <div class="mb-3">
        <label for="restaurantName" class="form-label">Restaurant Name</label>
        <input type="text" class="form-control" id="restaurant-name">
        </div>
        <div>
            <label for="primaryColor" class="form-label" >Primary color</label>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>    
    </section>
</form>

</template>


<style lang="scss" scoped>

</style>