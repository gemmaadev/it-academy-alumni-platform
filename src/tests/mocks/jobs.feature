Feature: Filter job opportunities

  Background:
    Given there are job offers available

  Scenario: Search by title
    When the user types "engineer" in the search field
    Then only job offers with "engineer" in the title are shown

  Scenario: Search by company
    When the user types "ABC" in the search field
    Then only job offers from company "ABC" are shown

  Scenario: Search by location
    When the user types "New York" in the search field
    Then only job offers located in "New York" are shown

  Scenario: Search by contract type
    When the user types "part-time" in the search field
    Then only job offers of type "part-time" are shown

  Scenario: Filter by industry
    When the user selects "Human Resources" in the industry filter
    Then only job offers from the "Human Resources" industry are shown

  Scenario: Filter by experience level
    When the user selects "Junior" in the experience filter
    Then only job offers with "Junior" experience level are shown

  Scenario: Combine industry and experience filters
    When the user selects "Technology" in the industry filter
    And the user selects "Senior" in the experience filter
    Then only job offers matching both filters are shown

  Scenario: Search with multiple active filters
    When the user types "engineer" in the search field
    And the user selects "Technology" in the industry filter
    Then only job offers matching all filters are shown

  Scenario: No results found
    When the user types "xyzxyzxyz" in the search field
    Then no job offers are returned

  Scenario: Reset filters
    Given the user has filtered by "Junior"
    When the user selects "All" in the experience filter
    Then all available job offers are shown