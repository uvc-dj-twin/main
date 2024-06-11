<template>
  <div class="col-lg-12 control-section">
    <div class="content-wrapper">
      <div class="container switch-control">
        <div>
          <h4 class="heading">Hotspot & tethering</h4>
        </div>
        <div>
          <label for="checked" style="padding: 10px 70px 10px 0"> USB Tethering </label>
          <SwitchComponent id="checked" :checked="true"></SwitchComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SwitchComponent } from "@syncfusion/ej2-vue-buttons";
import { rippleMouseHandler } from "@syncfusion/ej2-buttons";

export default {
  components: { SwitchComponent },
  mounted() {
    const elemArray = this.$el.querySelectorAll('.switch-control label');
    elemArray.forEach((elem) => {
      elem.addEventListener('mouseup', rippleHandler);
      elem.addEventListener('mousedown', rippleHandler);
    });
  },
};

function rippleHandler(e) {
  const rippleSpan = this.nextElementSibling.querySelector('.e-ripple-container');
  rippleSpan && rippleMouseHandler(e, rippleSpan);
}
</script>

