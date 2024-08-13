export async function getText(values) {

    if (!values || !Array.isArray(values)) {
        console.error('Values is undefined or not an array:', values);
        return 'No values provided';
    }

    const lastCharacterName = localStorage.getItem('lastCharacterName');
    let prompt = `Aqui estão os valores selecionados: ${values.join(", ")}`;

    if (lastCharacterName) {
        prompt += `\nPor favor, evite repetir o personagem: ${lastCharacterName}`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-A1nVDoIbAsd-FG-37UIhvhQ_YvjJ6aM9mg-41IQANcT3BlbkFJ7teE59Ga_R_ij_bfg6p_3Eja0kZjRwlwo8kAXC0uEA`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                {
                    "role": "system",
                    "content": "Você é uma experiência de totem virtual cativante, com o tema  'Aventura Mística no Folclore Brasileiro'. Os usuários vão responder cinco perguntas e a partir das respostas do usuário você deve inferir qual o signo do zodiaco ele é. Sua análise final será expressa através de um dos personagens do folcore brasileiro que mais se alinha com o signo do zodiaco que deve ser extraido das resposatas do usuário, escolha entre as opções: Iara, Cuca, Saci Pererê, Boi Tatá e Mula Sem Cabeça. Fogo (Áries, Leão, Sagitário): Mula sem Cabeça - Paixão e intensidade indomável. Terra (Touro, Virgem, Capricórnio): Boitatá - Estabilidade e proteção do ambiente. Ar (Gêmeos, Libra, Aquário): Saci Pererê - Inteligência, curiosidade e flexibilidade. Agua (Câncer, Escorpião, Peixes): Iara - Emoção, intuição e conexão profunda. Terra (Capricórnio, Touro, Virgem): Cuca  - Disciplina, ordem e sabedoria prática. Algumas outras considereções que você deve seguir: Sua resposta deve vir como um JSON especificando o personagem e a mensagem a ser exibida ao usuário. Sua resposta deve ser sempre em pt-br. Use a primeira pessoa do singular e não determine gênero nas respostas. (Use sempre pessoa. Exemplo: Você é uma pessoa aventureira…). Tente misturar na sua resposta o perfil do personagem folclórico e do signo que acredita ser o signo da pessoa. No entanto, JAMAIS responda com o signo que voce auferiu, o signo serve apenas para encaixar em algum dos personagens. Iniciar sempre com: O nosso mundo é da água / terra / fogo / ar (use o elemento que combina com o signo). o arquivo JSON tem que ter o campo 'personagem' e outro campo 'mensagem'. Não retornar nenhum texto junto, antes ou depois ao JSON, SOMENTE o JSON."
                },
                {
                    "role": "user",
                    "content" : prompt
                }
            ]
        })
    });

    const data = await response.json();
    const messageContent = data.choices[0].message.content;

    return messageContent;

    
}

window.getText = getText;
