import { ScrollView, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Unorderedlist from 'react-native-unordered-list';

export default function HarnessInformation() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How Do I Inspect My Safety Harness?</Text>
      <View style={styles.textBlock}>
        <Text style={styles.paragraph}>
          While often associated with working at height, safety harnesses are also used for work in confined spaces.
          When an emergency occurs, and a rescue needs to be carried out, having a fully functioning safety harness can
          mean the difference between life and death.
        </Text>
        <Text style={styles.paragraph}>
          So, although inspecting your safety harness before each use may seem tedious it should become second nature.
          While all safety harnesses should have regular formal inspections by a competent person do you really want to
          trust your life to someone else?
        </Text>
        <Text style={styles.paragraph}>
          Knowing how to perform a proper inspection and doing so prior to every use is the best way you can take your
          safety into your own hands. So, when inspecting your harness, what is it exactly that you need to look for?
        </Text>
      </View>
      <Text style={styles.title}>Webbing Inspection</Text>
      <View style={styles.textBlock}>
        <Text style={styles.paragraph}>
          First, untangle your harness so you can check that you aren’t missing any parts. Grabbing the harness by the
          back D-ring is a good place to hold it to shake it out and then holding it by the shoulder straps can help you
          get a good visual.
        </Text>
        <Text style={styles.paragraph}>
          Then, check the entire length of the webbing for any cuts, tears or other damage. The material should feel
          flexible, but you don’t want to see any stretching, fraying, burns, melting or missing straps. If you notice
          any stretching or uneven thickness of the webbing this might indicate that the harness has been involved in a
          fall. Use the boxes below to aid your inspection and if you encounter any of the defects with a red x next to
          them, the harness should not be used.
        </Text>
        <View style={styles.checkListBlock}>
          <Text style={styles.title}>Webbing Checklist</Text>
          <View style={styles.textBlock}>
            <Unorderedlist>
              <Text>Cuts, nicks or tears</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Broken fibres/cracks</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Overall deterioration</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Modifications by user</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Fraying or abrasions</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Discoloration - pass/fail depends on the cause of discoloration</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Hard or shiny spots - indicates heat damage</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Webbing thickness uneven - indicates possible fall</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Mildew - clean Harness</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Missing straps</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Undue stretching - indicates possible fall</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Burnt, charred or melted fibers - indicates heat damage</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Excessive hardness or brittleness - indicates heat or UV damage</Text>
            </Unorderedlist>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Stitching Inspection</Text>
      <View style={styles.textBlock}>
        <Text style={styles.paragraph}>
          Now, check for any pulled stitches or areas where the stitches are damaged or missing. Hard/shiny spots or
          discolouration might be the result of heat damage and the harness should not be used.
        </Text>
        <View style={styles.checkListBlock}>
          <Text style={styles.title}>Stitching Checklist</Text>
          <View style={styles.textBlock}>
            <Unorderedlist>
              <Text>Pulled/damaged stitches</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Missing stitches</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Hard or shiny spots - indicates heat damage</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Cut stitches</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Discoloration - Pass/fail depends on the cause of discoloration</Text>
            </Unorderedlist>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Hardware Inspection</Text>
      <View style={styles.textBlock}>
        <Text style={styles.paragraph}>
          The hardware includes all the metal buckles and grommets, as well as the plastic loops that keep the ends of
          the webbing in place. Check all the plastic for cracks, tears or deformities. Check the metal for bending,
          cracking or signs of rust and corrosion. The tongue in the buckle should line up and overlap the frame. When
          inspecting the grommets, you’re looking to see if one or more look more used than the others – this is a weak
          spot. Finally, check all the buckles to make sure they’re working properly.
        </Text>
        <View style={styles.checkListBlock}>
          <Text style={styles.title}>Hardware Checklist</Text>
          <View style={styles.textBlock}>
            <Unorderedlist>
              <Text>Distoration - twists, bends</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Rust or corrosion</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Broken / distorted grommets</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Modification by user eg additional holes</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Tongue buckle should overlap the buckle framge and move freely back and forth in the socket</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Roller of tongue buckle should turn freely on frame</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Bars must be straight</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>All springs must be in working condition</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Rough or sharp edges</Text>
            </Unorderedlist>
            <Unorderedlist>
              <Text>Cracks or breaks</Text>
            </Unorderedlist>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Identification/Labelling</Text>
      <View style={styles.textBlock}>
        <Text style={styles.paragraph}>
          The harness should also have all the proper tags and labels. The labels must be legible and contain
          identification data about the harness such as model number and manufacturer. It should also state the
          limitations and safety warnings related to the use of the harness. If this label is missing or illegible the
          harness should not be used. You also need to confirm the manufacturing date is present and that the harness
          does not exceed its working life.
        </Text>
        <Text style={styles.paragraph}>
          In addition, it is important to stress that if there is no test date on it or it is out of test date DO NOT
          USE the harness. Likewise, if there is no serial number on the harness DO NOT USE the harness. These are both
          essential to prove the harness is from a regulated manufacturer and has been recently checked by a competent
          and trained person. Your employer should have procedures in place for formal inspections every 3-6 months
          depending on how heavy the harness use is and these formal checks should be undertaken by a competent and
          trained person and a record should be kept.
        </Text>
        <Text style={styles.paragraph}>
          Although it should be thorough, your harness inspection does not need to take a long time. The important thing
          to remember is that in the event of an emergency the harness could be the thing that saves your life (or not
          if it is damaged or faulty!).
        </Text>
        <Text style={styles.paragraph}></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBlock: {
    paddingVertical: 20,
  },
  paragraph: {
    paddingVertical: 10,
  },
  checkListBlock: {
    backgroundColor: '#AEC6CF',
    marginVertical: 20,
    borderWidth: 1,
    padding: 30,
  },
});
