Feature: Alumni Search
  As an alumni
  I want to search for other members
  So that I can connect with profiles with common interests

  Background:
    Given I am on the networking page
    And the alumni list has loaded successfully

  Scenario: Search by first name
    When I type "John" in the search field
    Then I see alumni whose name contains "John"
    And the results update in real time

  Scenario: Search by last name
    When I type "Doe" in the search field
    Then I see alumni whose last name contains "Doe"

  Scenario: Search by position
    When I type "CEO" in the search field
    Then I see alumni with position "CEO"

  Scenario: Search by location
    When I type "New York" in the search field
    Then I see alumni located in "New York"

  Scenario: No results found
    When I type "zzzzz" in the search field
    Then I see the message "No s'han trobat alumnes"
    And the alumni grid is empty

  Scenario: Clear search
    Given I have typed "John" in the search field
    When I clear the search field
    Then I see all alumni again

 