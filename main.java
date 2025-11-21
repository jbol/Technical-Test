import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class main {

    public static void main(String[] args) {
        try {
            // Load all words into a HashSet for fast lookup
            List<String> lines = Files.readAllLines(Paths.get("wordlist.txt"));
            Set<String> words = new HashSet<>();
            ArrayList<String> correctWords= new ArrayList<>();

            for (String line : lines) {
                if (!line.isBlank()) {
                    words.add(line.trim().toLowerCase());
                }
            }

            // Check all 6-letter words
            for (String word : words) {
                if (word.length() != 6) continue;

                // Try every possible split point
                for (int i = 1; i < 6; i++) {

                    String left = word.substring(0, i);
                    String right = word.substring(i);

                    if (words.contains(left) && words.contains(right)) {
                        System.out.println(left + " + " + right + " => " + word);
                        correctWords.add(word);
                    }
                }
            }
            // Verify correct words are found
            if (verifyCorrectWords(correctWords)) {
                System.out.println("All expected words found.");
            } else {
                System.out.println("Some expected words are missing.");
            }

        } catch (IOException e) {
            System.err.println("Could not read wordlist.txt: " + e.getMessage());
        }
    }
    public static boolean verifyCorrectWords(ArrayList<String> words) {
        String[] expectedWords = {
            "albums", "barely", "befoul", "convex", "hereby",
            "jigsaw", "tailor", "weaver"
        };

        for (String expected : expectedWords) {
            if (!words.contains(expected)) {
                return false;
            }
        }
        return true;
    }
}
