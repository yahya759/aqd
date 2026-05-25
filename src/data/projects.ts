import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: "proj_logistics",
    title: "نظام أتمتة لوجستي الذكي",
    category: "الخدمات اللوجستية الذكية",
    expectedReturn: 18,
    durationMonths: 12,
    targetAmount: 20000,
    raisedAmount: 15000,
    status: 'active',
    description: "تطوير منصة معتمدة على الذكاء الاصطناعي لإدارة سلاسل الإمداد في منطقة الخليج وتحسين أزمنة الشحن والتسليم بنسبة 30% من خلال الروبوتات والتحليل التنبئي.",
    imagePrompt: "Futuristic logistics warehouse with autonomous robot fleet and holographic interfaces. cool-toned green highlights.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2ReVVkiYEgd1lRKDIxOcorz-JGgAjoxiwgBe879skf8RrTx-mxNsklW2soUKYz5lcdaMdQJqos3Srg_jh0EYMzuuJJLWxmxwYatdR1UMSwvXS1Wb-dAMoO88jAPYO-XnroWCfRYzYlt5lk7I5hti5hEKmFOyiXEIXY9GTYqx9lTDmoscogcrDdLZJ7ZTblEK7MhnLM57u-EWEMP0VROp8yjYNlBnw4TlYJf66t_AN45ha999RWvoMujoU7M3aV6VBWYLs3MuVBaw"
  },
  {
    id: "proj_sukuk",
    title: "منصة صكوك رقمية مشفرة",
    category: "التقنية المالية والتمويل الجماعي",
    expectedReturn: 22,
    durationMonths: 24,
    targetAmount: 50000,
    raisedAmount: 20000,
    status: 'active',
    description: "إصدار وإدارة صكوك المشاركة المتوافقة مع الشريعة الإسلامية باستخدام العقود الذكية وتقنيات البلوكشين المتقدمة، لخفض التكاليف الإدارية والتشغيلية للمستثمرين.",
    imagePrompt: "Sleek web3 server array and clean crypto nodes with high-end glow effects.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWbqaR40H20ypjIQbwV47rRpVIa5N6IoW6jM_HJOT5GPC5hJryUgCZlyjUZnYV6bwXrF0_P-1prTxWt09PvBKsR4k6QraNVkckm8X7yQg_zEpDswp8z_0OySBbo7ONOvLC2AfBPmUWEv-VMAZDb9YyvJjVRCAJZ3sQy_tf0tkbdqy7JOueWiG4UwHAxP0LWW_3wPALKrN2OoDWqnNWKw9Qr9kkcO2VQgUMzrt_t_zyc1S8SnK9ybs5SFXcABnjyRIMPau04Zoj_ww"
  },
  {
    id: "proj_farming",
    title: "مشروع الزراعة العمودية الذكية",
    category: "التقنيات الزراعية المستدامة",
    expectedReturn: 15,
    durationMonths: 18,
    targetAmount: 35000,
    raisedAmount: 31500,
    status: 'active',
    description: "مزرعة عمودية مؤتمتة بالكامل في مدينة الرياض، تعتمد على البيانات الكبيرة لترشيد استهلاك المياه بنسبة 95% ومراقبة المحاصيل عبر الرؤية الحاسوبية والذكاء الاصطناعي.",
    imagePrompt: "Automated vertical farming system with robotic arm and high-end agriculture tech data.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_eM2WofKPKcYvRWe0cQS4NppjFGy6RPvRPEjxdYSywAeH5mrkylCDFRs17szEVjH6mOULH1v_2XTt8is2mwB0D6N4uO6XIDoXNsrMVYxA0MswGfQa09XiVcgJ2hBShJoz9f65dNj9eK6lBHXrjqDdBLxaj-KxpPn8pBXhZHabFEL4kbM0TlpRZBBeyVy_ZX7zAS6462z3pc0YTHU_zGqjbGXTxtIvU5PGUCgTUM2Kw2qj6-GFLSOxhkS109ZHAVb-gmPRFtPLQTE"
  },
  {
    id: "proj_medical",
    title: "منصة تحليل البيانات الطبية والتشخيص الفوري",
    category: "التقنيات الصحية والذكاء الاصطناعي",
    expectedReturn: 24,
    durationMonths: 24,
    targetAmount: 100000,
    raisedAmount: 40000,
    status: 'active',
    description: "تطوير خوارزمية ذكاء اصطناعي قادرة على تشخيص الأورام السرطانية المبكرة من خلال صور الأشعة السينية والرنين المغناطيسي بمعدل دقة يفوق 99.4% بالتعاون مع مستشفيات رائدة.",
    imagePrompt: "Holographic rendering of medicine data and clinical tech visualization.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh9eW6dLmvbD_0ueg0sgLXD8Z0ao2xa2kXibP-WMAHwaNoibfOmQpl7IGUY2bqIDxkDEuzLJ9E6hKFDCqqE29Hh7lmeH7IpHKTc1STJe7i7gn-uBSvIcgVl8QZO9lagRUvQo2wYa_dGL4krRHkNylKCqQmDCJaAzuH3KNQP-GCLprKnRF7jHI54qiKhIHyFrCR_DkGsZtY5c7x5TDOUhwKOr6XkF-t7THPYc6qgKaG2N6htm6UNgA29in7bHQeJQLCCesjUbHzE8o"
  },
  {
    id: "proj_hardware",
    title: "معالجات الجيل السادس للذكاء والسرعات الفائقة",
    category: "البنية التحتية والعتاد الصلب",
    expectedReturn: 31,
    durationMonths: 36,
    targetAmount: 250000,
    raisedAmount: 0,
    status: 'upcoming',
    opensInDays: 5,
    description: "تأسيس أول معمل محلي لتصميم وتوزيع رقاقات المعالجة المخصصة لخوارزميات التعلم العميق والشبكات العصبية فائقة السرعة، متماشياً مع رؤية السعودية 2030 للسيادة التقنية.",
    imagePrompt: "Futuristic microchip architecture with glowing green light channels in dark laboratory.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9kgb1pHCMgg2Y6HZbQO6MVVKQ-l0m6tQRtZYYohHdEGfkXTvxudYNR26h8-7KDLN5T7uMyYZ7bzXjS83Om1qI4coOwukSjwP_l6e8vRNdKVuQxFfUk6O1MSW1rt8JnGeGzfX8HOwY2h9nvYLOpXHG-d_0fwqt6URgLxQpw4LprgESypyagTsftWTUQRB1Zq50OftSywhmb0MKQxejx4i9nkFRP5iHkuLMCbzkiE_0n6XVOwRjpjX-N6QLzsOlWmJv3nHNj1jI7Ao"
  }
];

export const userTiers = [
  { name: "فهد العتيبي", tier: "مستثمر بلاتيني", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQUjqasacFfvVrmHsE6ylMPjq5U3yVbx7TUeG8eUQQBw15iu9CJ_8vj2a1JX33f7YwaftnLKMIRLlfs9L_j-UDpXCd8MYGxeaiQOlSk_EbefFhD37Ge8xX9nusqqzZ5iDtPcl_ZHeoDbL--P_a7olB5_i34kRxLfu4ZpaQcnB82dGc8ykNSjARTdeFz5O-yWmmMgZ50Sn4z-5bpzUtSUTS8d5tZMjmbHt6xTgUgRv2ZVIFLfK-ql483rCkTHCvXQiAbTEN7-3Mf8" },
  { name: "أحمد العتيبي", tier: "مستثمر بريميوم", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_yYnWLXrFTgy0g1_L1rF40jb2obL5puaoF8zEoi4l_AslIuNdYaifV6IHnRSQfDDTCBEKv1wcmelIHdA7Zj0OK3WwCcQRW4bp5rCsOq7RDV5FeovX7FmTc-GNYAKrgq7CINK0QyvL5GRgABLebrvGLNtjPpKlIRh9Bn1c-CFte4Yxrw0mS3_LW1P1wG2y1O1xb0F5hs4vJ3t4SZ1JKE-bVW3NGlglaHHf-boO7S14VBHFSHKFQ-DrpO9AturONY4Eko6mZUiJqN4" }
];
