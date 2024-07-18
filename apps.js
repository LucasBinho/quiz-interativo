import OpenAI from 'openai';
const key = 'sk-proj-RxUAYEpZEbl4TjlHJquBT3BlbkFJbGmLvxWSa4pzvH9NqrFa'
const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true
});

export async function getText() {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                "role": "system",
                "content": "You are a helpful assistant"
            },
            {
                "role": "user",
                "content" : "Tell me about Brazil's folklore character Saci Pererê"
            }
        ],
        max_tokens: 150,
    });

    
    const messageContent =  (completion.choices[0].message.content);
    // Armazena a mensagem no local storage
    sessionStorage.setItem('openaiResponse', messageContent);

    return messageContent;
}

getText();
