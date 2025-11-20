'use client'

import { useState } from 'react'
import styles from './page.module.css'

type Lesson = {
  id: string
  title: string
  content: {
    turkish: string
    french: string
    pronunciation: string
  }[]
}

type Quiz = {
  question: string
  options: string[]
  correct: number
}

const lessons: Lesson[] = [
  {
    id: 'basics',
    title: 'Expressions de base',
    content: [
      { turkish: 'Merhaba', french: 'Bonjour', pronunciation: 'mer-ha-ba' },
      { turkish: 'Günaydın', french: 'Bon matin', pronunciation: 'gü-naï-dın' },
      { turkish: 'İyi akşamlar', french: 'Bonsoir', pronunciation: 'i-yi ak-cham-lar' },
      { turkish: 'İyi geceler', french: 'Bonne nuit', pronunciation: 'i-yi gue-djé-ler' },
      { turkish: 'Hoşça kal', french: 'Au revoir', pronunciation: 'hoch-tcha kal' },
      { turkish: 'Teşekkür ederim', french: 'Merci', pronunciation: 'te-chek-kür é-dé-rim' },
      { turkish: 'Lütfen', french: "S'il vous plaît", pronunciation: 'lüt-fen' },
      { turkish: 'Evet', french: 'Oui', pronunciation: 'é-vet' },
      { turkish: 'Hayır', french: 'Non', pronunciation: 'ha-yır' },
      { turkish: 'Affedersiniz', french: 'Excusez-moi', pronunciation: 'af-fé-der-si-niz' },
    ]
  },
  {
    id: 'numbers',
    title: 'Les nombres',
    content: [
      { turkish: 'Bir', french: '1 - Un', pronunciation: 'bir' },
      { turkish: 'İki', french: '2 - Deux', pronunciation: 'i-ki' },
      { turkish: 'Üç', french: '3 - Trois', pronunciation: 'ütch' },
      { turkish: 'Dört', french: '4 - Quatre', pronunciation: 'deurt' },
      { turkish: 'Beş', french: '5 - Cinq', pronunciation: 'bech' },
      { turkish: 'Altı', french: '6 - Six', pronunciation: 'al-tı' },
      { turkish: 'Yedi', french: '7 - Sept', pronunciation: 'yé-di' },
      { turkish: 'Sekiz', french: '8 - Huit', pronunciation: 'sé-kiz' },
      { turkish: 'Dokuz', french: '9 - Neuf', pronunciation: 'do-kouz' },
      { turkish: 'On', french: '10 - Dix', pronunciation: 'on' },
    ]
  },
  {
    id: 'food',
    title: 'Nourriture',
    content: [
      { turkish: 'Su', french: 'Eau', pronunciation: 'sou' },
      { turkish: 'Ekmek', french: 'Pain', pronunciation: 'ek-mek' },
      { turkish: 'Kahve', french: 'Café', pronunciation: 'kah-vé' },
      { turkish: 'Çay', french: 'Thé', pronunciation: 'tchaï' },
      { turkish: 'Süt', french: 'Lait', pronunciation: 'süt' },
      { turkish: 'Et', french: 'Viande', pronunciation: 'et' },
      { turkish: 'Balık', french: 'Poisson', pronunciation: 'ba-lık' },
      { turkish: 'Sebze', french: 'Légume', pronunciation: 'seb-zé' },
      { turkish: 'Meyve', french: 'Fruit', pronunciation: 'meï-vé' },
      { turkish: 'Tuz', french: 'Sel', pronunciation: 'touz' },
    ]
  },
  {
    id: 'family',
    title: 'Famille',
    content: [
      { turkish: 'Anne', french: 'Mère', pronunciation: 'an-né' },
      { turkish: 'Baba', french: 'Père', pronunciation: 'ba-ba' },
      { turkish: 'Kardeş', french: 'Frère/Sœur', pronunciation: 'kar-dech' },
      { turkish: 'Ağabey', french: 'Grand frère', pronunciation: 'a-a-beï' },
      { turkish: 'Abla', french: 'Grande sœur', pronunciation: 'ab-la' },
      { turkish: 'Çocuk', french: 'Enfant', pronunciation: 'tcho-djouk' },
      { turkish: 'Büyükanne', french: 'Grand-mère', pronunciation: 'bü-yük-an-né' },
      { turkish: 'Büyükbaba', french: 'Grand-père', pronunciation: 'bü-yük-ba-ba' },
      { turkish: 'Aile', french: 'Famille', pronunciation: 'a-i-lé' },
      { turkish: 'Arkadaş', french: 'Ami', pronunciation: 'ar-ka-dach' },
    ]
  }
]

const quizzes: Record<string, Quiz[]> = {
  basics: [
    {
      question: 'Comment dit-on "Bonjour" en turc ?',
      options: ['Merhaba', 'Günaydın', 'Hoşça kal', 'Teşekkür'],
      correct: 0
    },
    {
      question: 'Que signifie "Teşekkür ederim" ?',
      options: ['Au revoir', 'Bonjour', 'Merci', "S'il vous plaît"],
      correct: 2
    },
    {
      question: 'Comment dit-on "Non" en turc ?',
      options: ['Evet', 'Hayır', 'Lütfen', 'Merhaba'],
      correct: 1
    }
  ],
  numbers: [
    {
      question: 'Quel est le nombre "Beş" ?',
      options: ['3', '4', '5', '6'],
      correct: 2
    },
    {
      question: 'Comment dit-on "10" en turc ?',
      options: ['Dokuz', 'On', 'Sekiz', 'Yedi'],
      correct: 1
    },
    {
      question: 'Que signifie "Dört" ?',
      options: ['2', '3', '4', '5'],
      correct: 2
    }
  ],
  food: [
    {
      question: 'Que signifie "Su" ?',
      options: ['Pain', 'Eau', 'Café', 'Thé'],
      correct: 1
    },
    {
      question: 'Comment dit-on "Pain" en turc ?',
      options: ['Ekmek', 'Süt', 'Kahve', 'Çay'],
      correct: 0
    }
  ],
  family: [
    {
      question: 'Comment dit-on "Mère" en turc ?',
      options: ['Baba', 'Anne', 'Abla', 'Aile'],
      correct: 1
    },
    {
      question: 'Que signifie "Arkadaş" ?',
      options: ['Famille', 'Enfant', 'Ami', 'Frère'],
      correct: 2
    }
  ]
}

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn')
  const [quizIndex, setQuizIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFlashcard, setShowFlashcard] = useState(false)
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentLesson = lessons.find(l => l.id === selectedLesson)
  const currentQuizzes = selectedLesson ? quizzes[selectedLesson] || [] : []

  const handleAnswerClick = (index: number) => {
    if (answered) return

    setSelectedAnswer(index)
    setAnswered(true)

    if (index === currentQuizzes[quizIndex].correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (quizIndex < currentQuizzes.length - 1) {
      setQuizIndex(quizIndex + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      alert(`Quiz terminé ! Score: ${score + (selectedAnswer === currentQuizzes[quizIndex].correct ? 1 : 0)}/${currentQuizzes.length}`)
      setMode('learn')
      setQuizIndex(0)
      setScore(0)
      setAnswered(false)
      setSelectedAnswer(null)
    }
  }

  const startFlashcards = () => {
    setShowFlashcard(true)
    setFlashcardIndex(0)
    setShowAnswer(false)
  }

  const nextFlashcard = () => {
    if (currentLesson && flashcardIndex < currentLesson.content.length - 1) {
      setFlashcardIndex(flashcardIndex + 1)
      setShowAnswer(false)
    } else {
      setShowFlashcard(false)
      setFlashcardIndex(0)
      setShowAnswer(false)
    }
  }

  if (!selectedLesson) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>🇹🇷 Apprendre le Turc</h1>
          <p className={styles.subtitle}>Türkçe öğrenmek - Découvrez la langue turque</p>
        </header>

        <div className={styles.lessons}>
          {lessons.map(lesson => (
            <div
              key={lesson.id}
              className={styles.lessonCard}
              onClick={() => setSelectedLesson(lesson.id)}
            >
              <h2 className={styles.lessonTitle}>{lesson.title}</h2>
              <p className={styles.lessonCount}>{lesson.content.length} mots/phrases</p>
            </div>
          ))}
        </div>

        <footer className={styles.footer}>
          <p>💡 Astuce: Le turc utilise un alphabet latin avec quelques lettres spéciales</p>
        </footer>
      </div>
    )
  }

  if (showFlashcard && currentLesson) {
    const card = currentLesson.content[flashcardIndex]
    return (
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => setShowFlashcard(false)}
        >
          ← Retour
        </button>

        <div className={styles.flashcardContainer}>
          <div
            className={`${styles.flashcard} ${showAnswer ? styles.flipped : ''}`}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className={styles.flashcardFront}>
              <h2>{showAnswer ? card.french : card.turkish}</h2>
              {showAnswer && <p className={styles.pronunciation}>{card.pronunciation}</p>}
            </div>
          </div>

          <div className={styles.flashcardControls}>
            <p>{flashcardIndex + 1} / {currentLesson.content.length}</p>
            <button
              className={styles.nextButton}
              onClick={nextFlashcard}
            >
              {flashcardIndex < currentLesson.content.length - 1 ? 'Suivant →' : 'Terminer'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (mode === 'quiz' && currentQuizzes.length > 0) {
    const quiz = currentQuizzes[quizIndex]
    return (
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => {
            setMode('learn')
            setQuizIndex(0)
            setScore(0)
            setAnswered(false)
            setSelectedAnswer(null)
          }}
        >
          ← Retour
        </button>

        <div className={styles.quizContainer}>
          <div className={styles.quizHeader}>
            <h2>Question {quizIndex + 1}/{currentQuizzes.length}</h2>
            <p className={styles.score}>Score: {score}</p>
          </div>

          <div className={styles.quizQuestion}>
            <h3>{quiz.question}</h3>
          </div>

          <div className={styles.quizOptions}>
            {quiz.options.map((option, index) => (
              <button
                key={index}
                className={`${styles.quizOption} ${
                  answered && index === quiz.correct ? styles.correct : ''
                } ${
                  answered && index === selectedAnswer && index !== quiz.correct ? styles.incorrect : ''
                }`}
                onClick={() => handleAnswerClick(index)}
                disabled={answered}
              >
                {option}
              </button>
            ))}
          </div>

          {answered && (
            <button className={styles.nextButton} onClick={handleNextQuestion}>
              {quizIndex < currentQuizzes.length - 1 ? 'Question suivante' : 'Voir le résultat'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => setSelectedLesson(null)}
      >
        ← Retour aux leçons
      </button>

      <header className={styles.header}>
        <h1 className={styles.title}>{currentLesson?.title}</h1>
        <div className={styles.modeButtons}>
          <button
            className={styles.modeButton}
            onClick={startFlashcards}
          >
            📇 Cartes mémoire
          </button>
          {currentQuizzes.length > 0 && (
            <button
              className={styles.modeButton}
              onClick={() => setMode('quiz')}
            >
              🎯 Quiz
            </button>
          )}
        </div>
      </header>

      <div className={styles.vocabulary}>
        {currentLesson?.content.map((item, index) => (
          <div key={index} className={styles.vocabCard}>
            <div className={styles.vocabTurkish}>{item.turkish}</div>
            <div className={styles.vocabPronunciation}>[{item.pronunciation}]</div>
            <div className={styles.vocabFrench}>{item.french}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
