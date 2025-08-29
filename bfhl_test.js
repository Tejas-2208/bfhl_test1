export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ is_success: false, message: 'Method Not Allowed' });
    }

    const body = req.body || {};
    const data = Array.isArray(body.data) ? body.data : [];

    const fullName = 'Tejas S'; 
    const email = 'tejas.22bce8395@vitapstudent.ac.in';
    const roll_number = '22BCE8395';
    const user_id = `${fullName}_${roll_number}`.toLowerCase();

    const isNumericString = (s) => typeof s === 'string' && /^[+-]?\d+$/.test(s.trim());
    const isAlphabeticString = (s) => typeof s === 'string' && /^[A-Za-z]+$/.test(s);
    const isSingleChar = (s) => typeof s === 'string' && s.length === 1;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    const letterBuffer = [];

    for (const item of data) {
      const s = typeof item === 'string' ? item : String(item);
      if (isNumericString(s)) {
        const n = parseInt(s, 10);
        sum += n;
        if (Math.abs(n) % 2 === 0) {
          even_numbers.push(s);
        } else {
          odd_numbers.push(s);
        }
      } else if (isAlphabeticString(s)) {
        alphabets.push(s.toUpperCase());
        for (const ch of s) {
          letterBuffer.push(ch);
        }
      } else {
        special_characters.push(s);
      }
    }

    const reversedLetters = letterBuffer.reverse();
    const altCased = reversedLetters.map((ch, idx) =>
      idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join('');

    const response = {
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string: altCased
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: 'unknown_00000000',
      email: '',
      roll_number: '',
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: '0',
      concat_string: '',
      error: 'An error occurred while processing the request'
    });
  }
}
