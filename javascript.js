function getIPAddresses() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipv4_address').textContent = data.ip;
            fetch(`https://ipinfo.io/${data.ip}/json`)
                .then(response => response.json())
                .then(ipData => {
                    document.getElementById('ipv4_provider').textContent = ` - ISP: ${ipData.org}`;
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao obter informações do provedor de serviços de Internet (ISP) para IPv4:', error);
                    document.getElementById('ipv4_provider').textContent = ' - Informações do ISP não disponíveis.';
                });
        })
        .catch(error => {
            console.error('Ocorreu um erro ao obter o endereço IPv4:', error);
            document.getElementById('ipv4_address').textContent = 'Erro ao obter o endereço IPv4.';
        });

    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipv6_address').textContent = data.ip;
            fetch(`https://ipinfo.io/${data.ip}/json`)
                .then(response => response.json())
                .then(ipData => {
                    const ipv6ProviderElement = document.getElementById('ipv6_provider');
                    ipv6ProviderElement.innerHTML = `ISP (Provedor de Serviços de Internet): ${ipData.org}`;
                    ipv6ProviderElement.style.fontWeight = 'bold'; 
                    ipv6ProviderElement.style.color = '#000'; 
                    ipv6ProviderElement.style.fontSize = '20px'; 
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao obter informações do provedor de serviços de Internet (ISP) para IPv6:', error);
                    document.getElementById('ipv6_provider').textContent = ' - Informações do ISP não disponíveis.';
                });
        })
        .catch(error => {
            console.error('Ocorreu um erro ao obter o endereço IPv6:', error);
            document.getElementById('ipv6_address').textContent = 'Erro ao obter o endereço IPv6.';
        });
}

window.onload = getIPAddresses;

document.addEventListener("DOMContentLoaded", function () {
    // Verifica se a página é a de cadastro
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            // Salva os dados no localStorage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html"; // Redireciona para a página de login
        });
    }

    // Verifica se a página é a de login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Recupera os dados do localStorage
            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            if (email === storedEmail && password === storedPassword) {
                alert("Login realizado com sucesso!");
                window.location.href = "index.html"; // Redireciona para a página principal
            } else {
                alert("E-mail ou senha incorretos!");
            }
        });
    }
});
