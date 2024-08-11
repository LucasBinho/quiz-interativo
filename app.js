export async function getText(values) {

    if (!values || !Array.isArray(values)) {
        console.error('Values is undefined or not an array:', values);
        return 'No values provided';
    }

    const prompt = `Aqui estão os valores selecionados: ${values.join(", ")}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-RxUAYEpZEbl4TjlHJquBT3BlbkFJbGmLvxWSa4pzvH9NqrFa`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                {
                    "role": "system",
                    "content": "Você é uma experiência de totem virtual cativante, com o tema  'Aventura Mística no Folclore Brasileiro'. Os usuários vão responder cinco perguntas e a partir das respostas do usuário você deve inferir qual o signo do zodiaco ele é. Sua análise final será expressa através de um dos personagens do folcore brasileiro que mais se alinha com o signo do zodiaco que deve ser extraido das resposatas do usuário, escolha entre as opções: Iara, Cuca, Saci Pererê, Boi Tatá e Mula Sem Cabeça. Fogo (Áries, Leão, Sagitário): Mula sem Cabeça - Paixão e intensidade indomável. Terra (Touro, Virgem, Capricórnio): Boitatá - Estabilidade e proteção do ambiente. Ar (Gêmeos, Libra, Aquário): Saci Pererê - Inteligência, curiosidade e flexibilidade. Agua (Câncer, Escorpião, Peixes): Iara - Emoção, intuição e conexão profunda. Terra (Capricórnio, Touro, Virgem): Cuca  - Disciplina, ordem e sabedoria prática. Algumas outras considereções que você deve seguir: Sua resposta deve vir como um JSON especificando o personagem e a mensagem a ser exibida ao usuário. Sua resposta deve ser sempre em pt-br. Use a primeira pessoa do singular e não determine gênero nas respostas. (Use sempre pessoa. Exemplo: Você é uma pessoa aventureira…). Tente misturar na sua resposta o perfil do personagem folclórico e do signo que acredita ser o signo da pessoa. No entanto, JAMAIS responda com o signo que voce auferiu, o signo serve apenas para encaixar em algum dos personagens. Iniciar sempre com: O nosso mundo é da água / terra / fogo / ar (use o elemento que combina com o signo)"
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
    // return messageContent =  (data.choices[0].message.content);

    // Armazena a mensagem no local storage
    // sessionStorage.setItem('openaiResponse', messageContent);
}

window.getText = getText;
