<template>
  <div class="container" id="sigin_form">
    <div class="form-container sign-in-container">
      <h1>Sign in</h1>
      <div class="social-container">
        <a href="#" class="social">
          <img src="/icons/meta.svg" alt="meta">
        </a>
        <div @click="handleLogin({provider: 'google'})" class="social">
          <img src="/icons/google.svg" alt="google">
        </div>
        <a href="#" class="social">
          <img src="/icons/linkedin.svg" alt="linkedin">
        </a>
      </div>
      <span>or use your account</span>
      <input type="text" placeholder="Tên đăng nhập hoặc Email" v-model="form.username"/>
      <input type="password" placeholder="Password" v-model="form.password"/>
      <a href="#" class="link">Forgot your password?</a>
      <button @click="handleLogin()">Sign In</button>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-right">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const $router = useRouter()
const emits = defineEmits(['close'])
const form = reactive({
  username: '',
  password: ''
})
const { signIn } = useAuth()

const handleLogin = async (data = {}) => {
  const { provider = null } = data
  if(provider) {}
  const res = await signIn(form)

  if(res.success) {
    await $router.push({ name: 'admin' })
    $router.go()
    emits('close')
  } else {
    alert('user or password not correct')
  }
}
</script>

<style lang="scss">
#sigin_form {
  font-family: 'Montserrat', sans-serif;
  h1 {
    font-weight: bold;
    margin: 0;
  }
}

.sign-in-container {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  .link {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  button {
    border-radius: 20px;
    border: 1px solid #FF4B2B;
    background-color: #FF4B2B;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }
  form {

  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }
}
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
  0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  .overlay {
    background: #FF416C;
    background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
  }
  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
  }
  .overlay-right {
    right: 0;
    p {
      font-size: 14px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
    }
  }
}

.social-container {
  margin: 20px 0;
  span {
    font-size: 12px;
  }
  .social {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
    img {
      width: 35px;
    }
  }
}

</style>