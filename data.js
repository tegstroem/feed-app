export function renderPost(post) {
    return {
        name: getUser(post.index),
        caption: getCaption(post.index),
        camera: getCameraSpecs(post.index)
    };
}
function getUser(index) {
    const photographers = [
        "Alejandro Torres",
        "Mina Kobayashi",
        "Luca Moretti",
        "Amara Singh",
        "Jonas Müller",
        "Camila Duarte",
        "Noah Andersen",
        "Layla Haddad",
        "Tomasz Kowalski",
        "Elena Petrova"
        ];

    return photographers[index] || "Unknown Photographer";
}

function getCaption(index) {
    const captions = [
        "Gorgeous waterfall in the Sergovna mountains, thanks @charlienelson for the guide",
        "My grandfathers old boat, still going strong after all these years. We use to go fishing every summer. Beautiful memories.",
        "Back to school vibes.",
        "Vintage books.",
        "Jardin de l’Avenue Dorée, Paris.",
        "Skyline view from the rooftop.",
        "The Fangea river seen from the Seneat mountains -March 3, 2024.",
        "Brutalist architecture in Kranj, Slovenia",
        "Thai waters, before the storm....",
        "Details from an architects desk."
    ];
    return captions[index] || "Back to work!";
}

function getCameraSpecs(index) {
    const specs = [
        "Sony A7III | 24-70mm f/2.8",
        "Canon R5 | 16-35mm f/2.8",
        "Nikon Z6 | 70-200mm f/4",
        "Fujifilm X-T4 | 56mm f/1.2",
        "Sony A7R V | 100-400mm GM",
        "Canon EOS R6 Mark II | 35mm f/1.4",
        "Sony A7C II | 85mm f/1.8",
        "Nikon Z8 | 24-120mm f/4",
        "Fujifilm X-H2S | 18-55mm f/2.8-4",
        "Panasonic Lumix S5II | 50mm f/1.4",
        "Leica Q3 | 28mm f/1.7",
        "OM System OM-1 | 12-40mm f/2.8 PRO",
        "Canon EOS R3 | 100-500mm f/4.5-7.1L",
        "Sony FX3 | 24mm f/1.4 GM",
        "Nikon Zf | 40mm f/2"
        ];

    return specs[index] || "Camera info unavailable";
}
