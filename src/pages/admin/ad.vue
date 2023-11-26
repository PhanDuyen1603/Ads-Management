<template>
  <div class="row">
    <!-- column -->
    <div class="col-lg-8">
      <div class="card">
        <div class="card-body">
          <!-- <h4 class="card-title">Basic Table</h4>
          <h6 class="card-subtitle">Add class <code>.table</code></h6> -->
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Deshmukh</td>
                  <td>Prohaska</td>
                  <td>@Genelia</td>
                  <td>
                    <button class="btn btn-success">
                      Yêu cầu chỉnh sửa
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Deshmukh</td>
                  <td>Gaylord</td>
                  <td>@Ritesh</td>
                  <td>
                    <button class="btn btn-success">
                      Yêu cầu chỉnh sửa
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Sanghani</td>
                  <td>Gusikowski</td>
                  <td>@Govinda</td>
                  <td>
                    <button class="btn btn-success">
                      Yêu cầu chỉnh sửa
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Roshan</td>
                  <td>Rogahn</td>
                  <td>@Hritik</td>
                  <td>
                    <button class="btn btn-success">
                      Yêu cầu chỉnh sửa
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Joshi</td>
                  <td>Hickle</td>
                  <td>@Maruti</td>
                  <td>
                    <button class="btn btn-success">
                      Yêu cầu chỉnh sửa
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Nigam</td>
                  <td>Eichmann</td>
                  <td>@Sonu</td>
                  <td>
                    <button class="btn btn-success">
                      Yêu cầu chỉnh sửa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <ElementGmap class="map" :map-styles="{
        width: '100%',
        height: '30rem'
      }" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
</script>